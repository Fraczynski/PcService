import { Component, OnInit, Input } from '@angular/core';
import { Equipment } from '../_models/equipment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pagination } from '../_models/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EquipmentsService } from '../_services/equipments/equipments.service';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { EquipmentModalComponent } from '../employee/equipment-modal/equipment-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ElementsModalComponent } from '../elements-modal/elements-modal.component';

@Component({
  selector: 'app-equipments',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    )
  ],
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  @Input() employee = false;
  equipments: Equipment[] = [];
  equipmentNumberForm: FormGroup;
  currentUserId;
  jwtHelper = new JwtHelperService();
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination = new Pagination();
  bsModalRef: BsModalRef;

  constructor(private equipmentsService: EquipmentsService, private alertify: AlertifyService, private formBuilder: FormBuilder,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!this.employee) {
      this.currentUserId = decodedToken.nameid;
    }
    this.getEquipments(new Object());
    this.createEquipmentNumberForm();
  }

  reloadEquipments(form: FormGroup) {
    this.pageNumber = 1;
    const userParams = Object.assign({}, form.value);
    this.getEquipments(userParams);
  }

  getEquipments(userParams?) {
    this.equipmentsService.getEquipments(this.currentUserId, this.pageNumber, this.pageSize, userParams).subscribe((response) => {
      this.equipments = response.result;
      this.pagination = response.pagination;
      this.pageNumber = this.pagination.currentPage;
      this.pageSize = this.pagination.itemsPerPage;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.getEquipments();
  }

  addEquipmentModal() {
    this.bsModalRef = this.modalService.show(EquipmentModalComponent);
    this.bsModalRef.content.addNewEquipment.subscribe((equipment) => {
      this.equipmentsService.addEquipment(equipment.value).subscribe(() => {
        this.getEquipments();
        this.alertify.success('Dodano');
        this.getEquipments(new Object());
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  assignClientToEquipment() {
    this.equipmentsService.assignClientToEquipment(this.equipmentNumberForm.value.equipmentNumber, this.currentUserId).subscribe(() => {
      this.getEquipments();
      this.alertify.success('Pryzpisano sprzęt do Twojego konta');
    }, error => {
      this.alertify.error(error);
    });
  }

  createEquipmentNumberForm() {
    this.equipmentNumberForm = this.formBuilder.group({ equipmentNumber: [''] });
  }

  searchEquipment() {
    if (this.equipmentNumberForm.controls.equipmentNumber.value > 0) {
      this.equipmentsService.searchEquipment(this.equipmentNumberForm.value.equipmentNumber).subscribe((equipment: Equipment) => {
        this.equipments = [];
        this.equipments.push(equipment);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  showElementsModal(equipmentModal) {
    const initialState = {
      equipment: equipmentModal,
      employee: this.employee
    };
    this.bsModalRef = this.modalService.show(ElementsModalComponent, { initialState });
    this.bsModalRef.content.refreshEquipments.subscribe(() => {
      this.getEquipments(new Object());
    }, error => {
      this.alertify.error(error);
    });
  }
}

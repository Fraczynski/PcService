import { Component, OnInit, Input } from '@angular/core';
import { Repair } from '../_models/repair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pagination } from '../_models/pagination';
import { BsModalRef, BsModalService, PaginationComponent } from 'ngx-bootstrap';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { EquipmentsService } from '../_services/equipments/equipments.service';
import { Equipment } from '../_models/equipment';
import { EquipmentModalComponent } from '../employee/equipment-modal/equipment-modal.component';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  @Input() admin = false;
  equipments: Equipment[] = [];
  equipmentNumberForm: FormGroup;
  currentUserId;
  jwtHelper = new JwtHelperService();
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination = new Pagination();
  statusOptions: string[];
  bsModalRef: BsModalRef;

  constructor(private equipmentsService: EquipmentsService, private alertify: AlertifyService, private formBuilder: FormBuilder,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!this.admin) {
      this.currentUserId = decodedToken.nameid;
    }
    this.getEquipments(new Object());
    this.createRegisterForm();
  }

  reloadEquipments(form: FormGroup) {
    this.pageNumber = 1;
    const userParams = Object.assign({}, form.value);
    this.getEquipments(userParams);
  }

  getEquipments(userParams?) {
    this.equipmentsService.getClientEquipments(this.currentUserId, this.pageNumber, this.pageSize, userParams).subscribe((response) => {
      this.equipments = response.result;
      this.pagination = response.pagination;
      this.pageNumber = this.pagination.currentPage;
      this.pageSize = this.pagination.itemsPerPage;
      this.getStatusList();
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
        this.alertify.success('Repair with ID ' + ' added');
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
      this.alertify.success('Assigned the repair to your account');
    }, error => {
      this.alertify.error(error);
    });
  }

  createRegisterForm() {
    this.equipmentNumberForm = this.formBuilder.group({ equipmentNumber: [''] });
  }

  getStatusList() {
    this.equipmentsService.getStatusList(this.currentUserId).subscribe((response: string[]) => {
      this.statusOptions = response;
    }, error => {
      this.alertify.error(error);
    });
  }
}

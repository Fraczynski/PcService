import { Component, OnInit, Input } from '@angular/core';
import { Repair } from '../_models/repair';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pagination } from '../_models/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RepairsService } from '../_services/repairs/repairs.service';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { RepairModalComponent } from '../admin/repair-modal/repair-modal.component';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  @Input() admin = false;
  repairs: Repair[] = [];
  repairNumberForm: FormGroup;
  currentUserId;
  jwtHelper = new JwtHelperService();
  pageNumber;
  pageSize;
  pagination: Pagination;
  elementNames: string[];
  resultNames: string[];
  bsModalRef: BsModalRef;

  constructor(private repairsService: RepairsService, private alertify: AlertifyService, private formBuilder: FormBuilder,
    private modalService: BsModalService) {
    this.repairNumberForm = this.formBuilder.group({
      repairNumber: ''
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!this.admin) {
      this.currentUserId = decodedToken.nameid;
    }
    this.getRepairs();
    this.createRegisterForm();
    this.repairsService.getElementNames().subscribe((response: string[]) => {
      this.elementNames = response;
    }, error => {
      this.alertify.error(error);
    });
    this.repairsService.getResultOptions().subscribe((response: string[]) => {
      this.resultNames = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  reloadRepairs(form: FormGroup) {
    this.pageNumber = 1;
    const userParams = Object.assign({}, form.value);
    this.getRepairs(userParams);
  }

  getRepairs(userParams?) {
    this.repairsService.getRepairsForUser(this.currentUserId, this.pageNumber, this.pageSize, userParams).subscribe((response) => {
      this.repairs = response.result;
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
    this.getRepairs();
  }

  addRepairModal() {
    this.bsModalRef = this.modalService.show(RepairModalComponent);
    this.bsModalRef.content.addNewRepair.subscribe((repair) => {
      this.repairsService.addRepair(repair).subscribe((repairId) => {
        this.getRepairs();
        this.alertify.success('Repair with ID ' + repairId + ' added');
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  assignRepair() {
    this.repairsService.addRepairToUser(this.currentUserId, this.repairNumberForm.value).subscribe(() => {
      this.getRepairs();
      this.alertify.success('Assigned the repair to your account');
    }, error => {
      this.alertify.error(error);
    });
  }

  createRegisterForm() {
    this.repairNumberForm = this.formBuilder.group({ repairNumber: [''] });
  }
}

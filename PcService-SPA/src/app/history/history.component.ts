import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { Repair } from '../_models/repair';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from '../_models/pagination';
import { BsDatepickerConfig, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RepairModalComponent } from '../admin/repair-modal/repair-modal.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
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

  constructor(private userService: UserService, private alertify: AlertifyService, private formBuilder: FormBuilder,
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
    this.userService.getElementNames().subscribe((response: string[]) => {
      this.elementNames = response;
    }, error => {
      console.log(error);
    });
    this.userService.getResultOptions().subscribe((response: string[]) => {
      this.resultNames = response;
    }, error => {
      console.log(error);
    });
  }

  reloadRepairs(form: FormGroup) {
    this.pageNumber = 1;
    const userParams = Object.assign({}, form.value);
    this.getRepairs(userParams);
  }

  getRepairs(userParams?) {
    this.userService.getRepairsForUser(this.currentUserId, this.pageNumber, this.pageSize, userParams).subscribe((response) => {
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
      this.userService.addRepair(repair).subscribe(() => {
        this.getRepairs();
        this.alertify.success('Added new repair');
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  assignRepair() {
    this.userService.addRepairToUser(this.currentUserId, this.repairNumberForm.value).subscribe(() => {
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

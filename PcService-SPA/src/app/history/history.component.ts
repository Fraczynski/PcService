import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { Repair } from '../_models/repair';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from '../_models/pagination';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  repairs: Repair[] = [];
  repairNumberForm: FormGroup;
  currentUserId;
  jwtHelper = new JwtHelperService();
  pageNumber;
  pageSize;
  pagination: Pagination;
  elementNames: string[];
  resultNames: string[];
  boolOptions = ['Yes', 'No'];

  constructor(private userService: UserService, private alertify: AlertifyService, private formBuilder: FormBuilder) {
    this.repairNumberForm = this.formBuilder.group({
      repairNumber: ''
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.currentUserId = decodedToken.nameid;
    this.getRepairs();
    this.createRegisterForm();
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
      this.elementNames = [];
      this.resultNames = [];
      this.pageNumber = this.pagination.currentPage;
      this.pageSize = this.pagination.itemsPerPage;
      this.repairs.forEach(name => {
        if (!this.elementNames.includes(name.elementName)) {
          this.elementNames.push(name.elementName);
        }
      });
      this.repairs.forEach(name => {
        if (!this.resultNames.includes(name.result)) {
          this.resultNames.push(name.result);
        }
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.getRepairs();
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

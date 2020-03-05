import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { Repair } from '../_models/repair';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  model: any = {};
  repairs: Repair[];
  repairNumberForm: FormGroup;
  currentUserId;
  jwtHelper = new JwtHelperService();
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

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
  }

  getRepairs() {
    this.userService.getRepairsForUser(this.currentUserId, this.pageNumber, this.pageSize).subscribe((response) => {
      this.repairs = response.result;
      this.pagination = response.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  addRepairToUser() {
    this.userService.addRepairToUser(this.currentUserId, this.model).subscribe(() => {
      this.model.repairNumber = '';
      this.getRepairs();
      this.alertify.success('Assigned the repair to your account');
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.getRepairs();
  }
}

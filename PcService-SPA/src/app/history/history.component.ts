import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { Repair } from '../_models/repair';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  model: any = {};
  repairs: Repair[];
  repairNumberForm: FormGroup;
  repairsNumber: number;
  currentUserId;
  jwtHelper = new JwtHelperService();

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
    this.userService.getRepairsForUser(this.currentUserId).subscribe((repairs: Repair[]) => {
      this.repairs = repairs;
      this.repairsNumber = repairs.length;
    }, error => {
      this.alertify.error(error);
    });
  }

  addRepairToUser() {
    this.userService.addRepairToUser(this.currentUserId, this.model).subscribe((repair: Repair) => {
      this.model.repairNumber = '';
      this.repairsNumber = this.repairs.push(repair);
      this.alertify.success('Assigned the repair to your account');
    }, error => {
      this.alertify.error(error);
    });
  }
}

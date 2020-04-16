import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  loggedIn = false;
  bsModalRef: BsModalRef;

  constructor(private alertify: AlertifyService, private modalService: BsModalService, public authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn();
  }

  showRegisterModal() {
    this.bsModalRef = this.modalService.show(RegisterModalComponent);
  }
}

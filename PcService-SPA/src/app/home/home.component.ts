import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  bsModalRef: BsModalRef;

  constructor(private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  showRegisterModal() {
    this.bsModalRef = this.modalService.show(RegisterModalComponent);
  }
}

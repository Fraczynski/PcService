import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  @Output() newUser = new EventEmitter();
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService, public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      email: new FormControl(),
      telNumber: new FormControl()
    });
  }

  register() {
    // this.authService.register(this.registerForm.value).subscribe(() => {
    //   this.alertify.success('Created new account');
    //   this.bsModalRef.hide();
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);
  }
}

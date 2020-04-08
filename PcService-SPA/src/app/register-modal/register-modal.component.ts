import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify/alertify.service';
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
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.alertify.success('Utworzono nowe konto');
      this.bsModalRef.hide();
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return (g.get('password').value === g.get('confirmPassword').value) ? null : { 'mismatch': true };
  }
}

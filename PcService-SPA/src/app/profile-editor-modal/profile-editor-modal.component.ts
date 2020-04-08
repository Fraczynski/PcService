import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { UserService } from '../_services/user/user.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-profile-editor-modal',
  templateUrl: './profile-editor-modal.component.html',
  styleUrls: ['./profile-editor-modal.component.css']
})
export class ProfileEditorModalComponent implements OnInit {
  profileForm: FormGroup;
  profile;

  constructor(private alertify: AlertifyService, private formBuilder: FormBuilder, private userService: UserService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.getProfile();
    this.createForm();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: ['']
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe((profile: any) => {
      this.profile = profile;
      this.profileForm = this.formBuilder.group({
        oldPassword: [''],
        newPassword: [''],
        confirmPassword: [''],
        firstName: [this.profile.firstName],
        lastName: [this.profile.lastName],
        email: [this.profile.email],
        phoneNumber: [this.profile.phoneNumber]
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  editProfile() {
    this.userService.editProfile(this.profileForm.value).subscribe(() => {
      this.alertify.success('Zaktualizowano');
      this.bsModalRef.hide();
    }, error => {
      this.alertify.error(error);
    });
  }
}

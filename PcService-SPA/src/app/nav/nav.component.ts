import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProfileEditorModalComponent } from '../profile-editor-modal/profile-editor-modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  bsModalRef: BsModalRef;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      if (this.authService.roleMatch(['Administrator', 'Serviceman', 'Salesman'])) {
        this.router.navigate(['/admin']);
      } else if (this.authService.roleMatch('Client')) {
        this.router.navigate(['/history']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  editProfileModal() {
    this.bsModalRef = this.modalService.show(ProfileEditorModalComponent);
  }
}

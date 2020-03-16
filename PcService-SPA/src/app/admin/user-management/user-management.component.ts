import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';
import { map } from 'rxjs/operators';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[3] = [
      { name: 'Administrator', value: 'Administrator' },
      { name: 'Serviceman', value: 'Serviceman' },
      { name: 'Salesman', value: 'Salesman' },
      { name: 'Client', value: 'Client' }
    ];

    availableRoles.forEach(availableRole => {
      let isMatch = false;
      userRoles.forEach(userRole => {
        if (availableRole.name === userRole) {
          isMatch = true;
          availableRole.checked = true;
          roles.push(availableRole);
        }
      });
      if (!isMatch) {
        availableRole.checked = false;
        roles.push(availableRole);
      }
    });

    return roles;
  }
}

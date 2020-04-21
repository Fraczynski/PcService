import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ElementsModalComponent } from '../elements-modal/elements-modal.component';
import { UserService } from '../_services/user/user.service';
import { AlertifyService } from '../_services/alertify/alertify.service';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css']
})
export class EquipmentCardComponent implements OnInit {
  @Input() equipment;
  @Input() employee = false;
  bsModalRef: BsModalRef;
  isCollapsed = true;
  contactDetails = { phoneNumber: '', email: '' };

  constructor(private modalService: BsModalService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  showContactDetails() {
    console.log('a');
  }

  getContactDetails(userName: string) {
    this.userService.getContactDetails(userName).subscribe((response: any) => {
      this.contactDetails = response;
      this.isCollapsed = false;
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleCollapse(userName: string) {
    if (this.isCollapsed) {
      this.getContactDetails(userName);
    } else {
      this.isCollapsed = true;
    }
  }
}

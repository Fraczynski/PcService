import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user/user.service';
import { AlertifyService } from '../_services/alertify/alertify.service';

@Component({
  selector: 'app-element-card',
  templateUrl: './element-card.component.html',
  styleUrls: ['./element-card.component.css']
})
export class ElementCardComponent implements OnInit {
  @Input() element;
  @Input() employee = false;
  isCollapsed = true;
  contactDetails = { phoneNumber: '', email: '' };

  constructor(private userService: UserService, private alertify: AlertifyService) {
  }

  ngOnInit() {
  }

  getContactDetails() {
    this.userService.getContactDetails(this.element.servicemanName).subscribe((response: any) => {
      this.contactDetails = response;
      this.isCollapsed = !this.isCollapsed;
    }, error => {
      this.alertify.error(error);
    });
  }
}

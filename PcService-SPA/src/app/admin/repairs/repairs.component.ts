import { Component, OnInit } from '@angular/core';
import { Repair } from 'src/app/_models/repair';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { RepairModalComponent } from '../repair-modal/repair-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  repairs: Repair[];
  bsModalRef: BsModalRef;

  constructor(private userService: UserService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getRepairsHistory();
  }

  getRepairsHistory() {
    this.userService.getRepairsHistory().subscribe((repairs: Repair[]) => {
      this.repairs = repairs;
    }, error => {
      this.alertify.error(error);
    });
  }

  addRepairModal() {
    this.bsModalRef = this.modalService.show(RepairModalComponent);
    this.bsModalRef.content.addNewRepair.subscribe((repair) => {
      this.userService.addRepair(repair).subscribe((returnedRepair: Repair) => {
        this.repairs.push(returnedRepair);
        this.alertify.success('Added new repair');
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }
}

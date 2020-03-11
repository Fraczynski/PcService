import { Component, OnInit } from '@angular/core';
import { Repair } from 'src/app/_models/repair';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RepairModalComponent } from '../repair-modal/repair-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgModel } from '@angular/forms';
import { Pagination } from 'src/app/_models/pagination';
import { RepairsService } from 'src/app/_services/repairs.service';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  repairs: Repair[];
  bsModalRef: BsModalRef;
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private repairsService: RepairsService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getRepairsHistory();
  }

  getRepairsHistory() {
    this.repairsService.getRepairsHistory(this.pageNumber, this.pageSize).subscribe((response) => {
      this.repairs = response.result;
      this.pagination = response.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  addRepairModal() {
    this.bsModalRef = this.modalService.show(RepairModalComponent);
    this.bsModalRef.content.addNewRepair.subscribe((repair) => {
      this.repairsService.addRepair(repair).subscribe(() => {
        this.getRepairsHistory();
        this.alertify.success('Added new repair');
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.pageNumber = event.page;
    this.getRepairsHistory();
  }
}

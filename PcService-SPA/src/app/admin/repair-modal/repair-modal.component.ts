import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Repair } from 'src/app/_models/repair';

@Component({
  selector: 'app-repair-modal',
  templateUrl: './repair-modal.component.html',
  styleUrls: ['./repair-modal.component.css']
})
export class RepairModalComponent implements OnInit {
  @Output() addNewRepair = new EventEmitter();
  model: any = {};

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addRepair() {
    if (this.model.warrantyRepair !== false) {
      this.model.warrantyRepair = true;
    }
    this.addNewRepair.emit(this.model);
    this.bsModalRef.hide();
  }
}

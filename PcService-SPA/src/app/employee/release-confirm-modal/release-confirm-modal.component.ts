import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-release-confirm-modal',
  templateUrl: './release-confirm-modal.component.html',
  styleUrls: ['./release-confirm-modal.component.css']
})
export class ReleaseConfirmModalComponent implements OnInit {
  @Input() equipment;
  @Input() elements;
  @Output() releaseEquipment = new EventEmitter();
  partsCost = 0;
  serviceCost = 0;
  totalCost = 0;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    for (const element of this.elements) {
      this.partsCost += element.partsCost;
      this.serviceCost += element.serviceCost;
    }
    this.totalCost = this.partsCost + this.serviceCost;
  }

  confirm() {
    this.releaseEquipment.emit(null);
    this.bsModalRef.hide();
  }
}

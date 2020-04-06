import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Output() returnMessage = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  return(message: string) {
    this.returnMessage.emit(message);
    this.bsModalRef.hide();
  }
}

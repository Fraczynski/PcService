import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.css']
})
export class EquipmentModalComponent implements OnInit {
  @Output() addNewEquipment = new EventEmitter();
  equipmentForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      clientId: [''],
      name: ['', Validators.required],
      problemDescription: ['', Validators.required],
    });
  }

  addEquipment() {
    this.addNewEquipment.emit(this.equipmentForm);
    this.bsModalRef.hide();
  }
}

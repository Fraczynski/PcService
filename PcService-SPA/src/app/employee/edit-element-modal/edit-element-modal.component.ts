import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElementsService } from 'src/app/_services/elements/elements.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { Element } from 'src/app/_models/element';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-element-modal',
  templateUrl: './edit-element-modal.component.html',
  styleUrls: ['./edit-element-modal.component.css']
})
export class EditElementModalComponent implements OnInit {
  @Output() refreshElements = new EventEmitter();
  editedElement: Element;
  elementForm: FormGroup;
  boolOptions = [true, false];

  constructor(private elementsService: ElementsService, private alertify: AlertifyService, private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.createElementForm();
  }

  createElementForm() {
    this.elementForm = this.formBuilder.group({
      id: [this.editedElement.id],
      status: [this.editedElement.status],
      description: [this.editedElement.description],
      warrantyRepair: [this.editedElement.warrantyRepair],
      partsCost: [this.editedElement.partsCost],
      serviceCost: [this.editedElement.serviceCost],
      newWarrantyPeriod: [this.editedElement.newWarrantyPeriod]
    });
  }

  updateElement() {
    this.elementsService.updateElement(this.elementForm.value).subscribe(() => {
      this.alertify.success('Zaktualizowano');
      this.refreshElements.emit(null);
      this.bsModalRef.hide();
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }

}

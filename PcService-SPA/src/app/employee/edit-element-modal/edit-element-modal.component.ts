import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElementsService } from 'src/app/_services/elements/elements.service';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { Element } from 'src/app/_models/element';
import { BsModalRef } from 'ngx-bootstrap';
import { StatusesService } from 'src/app/_services/statuses/statuses.service';

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
  statusOptions;

  constructor(private elementsService: ElementsService, private alertify: AlertifyService, private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef, private statusesService: StatusesService) { }

  ngOnInit() {
    this.createElementForm();
    this.getStatusList();
  }

  createElementForm() {
    this.elementForm = this.formBuilder.group({
      id: [this.editedElement.id],
      status: [this.editedElement.status],
      description: [this.editedElement.description],
      warrantyRepair: [this.editedElement.warrantyRepair],
      partsCost: [this.editedElement.partsCost],
      serviceCost: [this.editedElement.serviceCost],
      newWarrantyPeriod: [new Date(this.editedElement.newWarrantyPeriod)]
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

  getStatusList() {
    this.statusesService.getElementStatuses().subscribe((response) => {
      this.statusOptions = response;
      this.statusOptions.forEach(item => {
        if (item.name === this.editedElement.status) {
          this.elementForm.controls.status.setValue(item.id);
        }
      });
    }, error => {
      this.alertify.error(error);
    });
  }
}

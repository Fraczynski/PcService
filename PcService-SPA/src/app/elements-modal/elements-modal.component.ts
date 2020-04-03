import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { ElementsService } from '../_services/elements/elements.service';
import { Equipment } from '../_models/equipment';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementNamesService } from '../_services/elementNames/elementNames.service';
import { ElementName } from '../_models/elementName';

@Component({
  selector: 'app-elements-modal',
  templateUrl: './elements-modal.component.html',
  styleUrls: ['./elements-modal.component.css']
})
export class ElementsModalComponent implements OnInit {
  employee = false;
  equipment: Equipment;
  elements: Element[];
  isCollapsed = true;
  elementForm: FormGroup;
  statusOptions: string[];
  nameOptions;
  boolOptions = [true, false];

  constructor(private alertify: AlertifyService, private elementsService: ElementsService, private bsModalRef: BsModalRef,
    private elementNamesService: ElementNamesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEquipmentElements();
    if (this.employee) {
      this.getElementNameList();
    }
    this.elementForm = this.formBuilder.group({
      equipmentId: [''],
      nameId: ['', Validators.required],
      description: ['', Validators.required],
      warrantyRepair: ['']
    });
  }

  getEquipmentElements() {
    this.elementsService.getEquipmentElements(this.equipment.id).subscribe((response: Element[]) => {
      this.elements = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  addElement() {
    const element = this.elementForm.value;
    element.equipmentId = this.equipment.id;
    this.elementsService.addElement(element).subscribe((response: Element) => {
      this.elements.push(response);
    }, error => {
      this.alertify.error(error);
    });
  }

  getElementNameList() {
    this.elementNamesService.getElementNamesList().subscribe((response: ElementName[]) => {
      this.nameOptions = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  getStatusList() {
    // this.elementsService.getStatusList(this.currentUserId).subscribe((response: string[]) => {
    //   this.statusOptions = response;
    // }, error => {
    //   this.alertify.error(error);
    // });
  }
}

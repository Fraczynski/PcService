import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { ElementsService } from '../_services/elements/elements.service';
import { Equipment } from '../_models/equipment';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementNamesService } from '../_services/elementNames/elementNames.service';
import { ElementName } from '../_models/elementName';
import { EquipmentsService } from '../_services/equipments/equipments.service';

@Component({
  selector: 'app-elements-modal',
  templateUrl: './elements-modal.component.html',
  styleUrls: ['./elements-modal.component.css']
})
export class ElementsModalComponent implements OnInit {
  @Output() refreshEquipments = new EventEmitter();
  employee = false;
  equipment: Equipment;
  elements: Element[];
  isCollapsed = true;
  elementForm: FormGroup;
  statusOptions: string[];
  nameOptions;
  boolOptions = [true, false];

  constructor(private alertify: AlertifyService, private elementsService: ElementsService, private bsModalRef: BsModalRef,
    private elementNamesService: ElementNamesService, private formBuilder: FormBuilder, private equipmentService: EquipmentsService) { }

  ngOnInit() {
    this.getEquipmentElements();
    if (this.employee) {
      this.getElementNameList();
    }
    this.elementForm = this.formBuilder.group({
      equipmentId: [''],
      nameId: [, Validators.required],
      description: ['', Validators.required],
      warrantyRepair: []
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
      this.getEquipmentElements();
      this.elements.push(response);
      this.alertify.success('Dodano');
      this.elementForm.reset();
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

  releaseEquipment() {
    this.equipmentService.releaseEquipment(this.equipment.id).subscribe(() => {
      this.alertify.success('Wydano');
      this.refreshEquipments.emit(null);
      this.equipmentService.getEquipment(this.equipment.id).subscribe((equipment: Equipment) => {
        this.equipment = equipment;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  setRepairedStatus() {
    this.equipmentService.setRepairedStatus(this.equipment.id).subscribe(() => {
      this.alertify.success('Naprawiono');
      this.refreshEquipments.emit(null);
      this.equipmentService.getEquipment(this.equipment.id).subscribe((equipment: Equipment) => {
        this.equipment = equipment;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }
}

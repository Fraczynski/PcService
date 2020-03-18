import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../_services/alertify/alertify.service';
import { ElementsService } from '../_services/elements/elements.service';
import { Equipment } from '../_models/equipment';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-elements-modal',
  templateUrl: './elements-modal.component.html',
  styleUrls: ['./elements-modal.component.css']
})
export class ElementsModalComponent implements OnInit {
  equipment: Equipment;
  elements: Element[];

  constructor(private alertify: AlertifyService, private elementsService: ElementsService, private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.getEquipmentElements();
  }

  getEquipmentElements() {
    this.elementsService.getEquipmentElements(this.equipment.id).subscribe((response: Element[]) => {
      this.elements = response;
    }, error => {
      this.alertify.error(error);
    });
  }
}

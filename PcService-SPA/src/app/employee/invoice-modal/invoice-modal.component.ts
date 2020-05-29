import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { InvoicesService } from 'src/app/_services/invoices/invoices.service';
import { FormGroup } from '@angular/forms';
import { EquipmentsService } from 'src/app/_services/equipments/equipments.service';
import { Equipment } from 'src/app/_models/equipment';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {
  equipment;
  inputElements;
  elements = [];

  constructor(public bsModalRef: BsModalRef, private alertify: AlertifyService, private invoicesService: InvoicesService,
    private equipmentsService: EquipmentsService) { }

  ngOnInit() {
    this.inputElements.forEach(element => this.elements.push(Object.assign({}, element)));
  }

  createInvoice() {
    this.invoicesService.createInvoice(this.equipment, this.elements).subscribe((response: any) => {
      this.alertify.message('Utworzono fakturę');
      this.invoicesService.getInvoice(response.id);
      this.equipmentsService.addInvoice(this.equipment.id, response.id).subscribe((equipment: Equipment) => {
        this.equipment = equipment;
      }, error => {
        this.alertify.error(error);
      });
      this.bsModalRef.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

}

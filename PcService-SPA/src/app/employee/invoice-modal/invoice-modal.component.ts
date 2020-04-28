import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify/alertify.service';
import { InvoicesService } from 'src/app/_services/invoices/invoices.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {
  inputElements;
  equipment;
  elements = [];

  constructor(public bsModalRef: BsModalRef, private alertify: AlertifyService, private invoicesService: InvoicesService) { }

  ngOnInit() {
    this.inputElements.forEach(element => this.elements.push(Object.assign({}, element)));
  }

  createInvoice() {
    this.invoicesService.createInvoice(this.equipment, this.elements).subscribe((response: any) => {
      this.alertify.message('Utworzono fakturę');
      this.invoicesService.getInvoice(response.id);
      this.bsModalRef.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

}

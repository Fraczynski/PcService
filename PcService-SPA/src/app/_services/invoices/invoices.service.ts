import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private invoicesApi = 'https://pcservice.fakturownia.pl/invoices';
  private apiToken = '5UItqBNWuwdllfvVekqL';

  constructor(private http: HttpClient) { }

  createInvoice(equipment, elements) {
    const todayDate = new Date();
    const paymentDate = new Date(equipment.releaseDate);
    paymentDate.setDate(paymentDate.getDate() + 7);

    const elementPositions = [];

    for (const element of elements) {
      elementPositions.push({
        name: element.name,
        tax: 23,
        total_price_gross: element.partsCost,
        quantity: 1
      });
      elementPositions.push({
        name: element.description,
        tax: 8,
        total_price_gross: element.serviceCost,
        quantity: 1
      });
    }

    const data = {
      api_token: this.apiToken,
      invoice: {
        kind: 'vat',
        number: null,
        sell_date: new Date(equipment.releaseDate).toLocaleDateString(),
        issue_date: todayDate.toLocaleDateString(),
        payment_to: paymentDate.toLocaleDateString(),
        seller_name: 'PcService',
        buyer_name: equipment.clientName,
        positions: elementPositions
      }
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post(this.invoicesApi + '.json', data, httpOptions);
  }

  getInvoice(id: string) {
    window.open(this.invoicesApi + '/' + id + '.pdf?api_token=' + this.apiToken);
  }
}

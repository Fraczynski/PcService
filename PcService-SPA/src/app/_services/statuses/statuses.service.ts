import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateStatus(equipmentId: number, status) {
    return this.http.patch(this.baseUrl + 'statuses/equipment', status);
  }

  getEquipmentStatuses() {
    return this.http.get(this.baseUrl + 'statuses/equipments');
  }

  getServicemanStatuses(servicemanId: number) {
    return this.http.get(this.baseUrl + 'statuses/serviceman/' + servicemanId);
  }

  getClientStatuses(clientId?: number) {
    return this.http.get(this.baseUrl + 'statuses/client/' + clientId);
  }

  getElementStatuses() {
    return this.http.get(this.baseUrl + 'statuses/elements');
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../_models/repair';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRepairsForUser(clientId: number) {
    return this.http.get(this.baseUrl + 'repairs/' + clientId);

    // const params = new HttpParams();
    // params.append('client', 'false');
  }

  addRepairToUser(clientId: number, repairNumber: any) {
    return this.http.put(this.baseUrl + 'repairs/' + clientId, repairNumber);
  }

  getRepairsHistory() {
    return this.http.get(this.baseUrl + 'repairs');
  }

  addRepair(repair: Repair) {
    return this.http.post(this.baseUrl + 'repairs', repair)
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadStatistics(type: string) {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get(this.baseUrl + 'statistics', { params });
  }

  loadServicemanStatistics(type: string) {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get(this.baseUrl + 'statistics/serviceman', { params });
  }
}

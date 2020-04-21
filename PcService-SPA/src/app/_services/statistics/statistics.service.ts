import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadStatistics(type: string, statisticParams?) {
    let params = new HttpParams();
    if (statisticParams) {
      params = this.addParams(statisticParams);
    }
    debugger;
    return this.http.get(this.baseUrl + 'statistics/' + type, { params });
  }

  loadServicemanStatistics(type: string, statisticsParams?) {
    let params = new HttpParams();
    params = params.append('statisticsParams', statisticsParams);
    return this.http.get(this.baseUrl + 'statistics/serviceman/' + type, { params });
  }

  addParams(statisticParams): HttpParams {
    let params = new HttpParams();

    if (statisticParams != null) {
      if (statisticParams.servicemanName !== '' && statisticParams.servicemanName != null && statisticParams.servicemanName !== 'null') {
        params = params.append('servicemanName', statisticParams.servicemanName);
      }
      if (statisticParams.elementName !== '' && statisticParams.elementName != null && statisticParams.elementName !== 'null') {
        params = params.append('elementName', statisticParams.elementName);
      }
      if (statisticParams.elementStatus !== '' && statisticParams.elementStatus != null && statisticParams.elementStatus !== 'null') {
        params = params.append('elementStatus', statisticParams.elementStatus);
      }
      if (statisticParams.minEquipmentRequestDate !== '' && statisticParams.minEquipmentRequestDate != null
        && statisticParams.minEquipmentRequestDate !== 'null') {
        params = params.append('minEquipmentRequestDate', statisticParams.minEquipmentRequestDate.toDateString());
      }
      if (statisticParams.maxEquipmentRequestDate !== '' && statisticParams.maxEquipmentRequestDate != null
        && statisticParams.maxEquipmentRequestDate !== 'null') {
        params = params.append('maxEquipmentRequestDate', statisticParams.maxEquipmentRequestDate.toDateString());
      }
      if (statisticParams.minEquipmentReleaseDate !== '' && statisticParams.minEquipmentReleaseDate != null
        && statisticParams.minEquipmentReleaseDate !== 'null') {
        params = params.append('minEquipmentReleaseDate', statisticParams.minEquipmentReleaseDate.toDateString());
      }
      if (statisticParams.maxEquipmentReleaseDate !== '' && statisticParams.maxEquipmentReleaseDate != null
        && statisticParams.maxEquipmentReleaseDate !== 'null') {
        params = params.append('maxEquipmentReleaseDate', statisticParams.maxEquipmentReleaseDate.toDateString());
      }
    }
    return params;
  }
}

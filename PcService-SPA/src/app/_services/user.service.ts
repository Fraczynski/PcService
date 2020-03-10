import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../_models/repair';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRepairsForUser(clientId?, page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Repair[]>> {
    const paginatedResult: PaginatedResult<Repair[]> = new PaginatedResult<Repair[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      if (userParams.elementName !== '' && userParams.elementName != null && userParams.elementName !== 'null') {
        params = params.append('elementName', userParams.elementName);
      }
      if (userParams.repairId !== '' && userParams.repairId != null && userParams.repairId !== 'null') {
        params = params.append('repairId', userParams.repairId);
      }
      if (userParams.result !== '' && userParams.result != null && userParams.result !== 'null') {
        params = params.append('result', userParams.result);
      }
      if (userParams.warrantyRepair !== '' && userParams.warrantyRepair !== null && userParams.warrantyRepair !== 'null') {
        params = params.append('warrantyRepair', (userParams.warrantyRepair === 'Yes' ? 'true' : 'false'));
      }
      if (userParams.minWarrantyExpiryDate !== '' && userParams.minWarrantyExpiryDate != null
        && userParams.minWarrantyExpiryDate !== 'null') {
        params = params.append('minWarrantyExpiryDate', userParams.minWarrantyExpiryDate.toUTCString());
      }
      if (userParams.maxWarrantyExpiryDate !== '' && userParams.maxWarrantyExpiryDate != null
        && userParams.maxWarrantyExpiryDate !== 'null') {
        params = params.append('maxWarrantyExpiryDate', userParams.maxWarrantyExpiryDate.toUTCString());
      }
      if (userParams.orderBy !== '' && userParams.orderBy != null) {
        params = params.append('orderBy', userParams.orderBy);
      }
    }

    if (clientId == null) {
      clientId = '';
    }

    return this.http.get<Repair[]>(this.baseUrl + 'repairs/' + clientId, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  addRepairToUser(clientId: number, repairNumber: number) {
    return this.http.put(this.baseUrl + 'repairs/' + clientId, repairNumber);
  }

  getRepairsHistory(page?, itemsPerPage?): Observable<PaginatedResult<Repair[]>> {
    const paginatedResult: PaginatedResult<Repair[]> = new PaginatedResult<Repair[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Repair[]>(this.baseUrl + 'repairs', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  addRepair(repair: Repair) {
    return this.http.post(this.baseUrl + 'repairs', repair);
  }

  getElementNames() {
    return this.http.get(this.baseUrl + 'repairs/' + 'elementNames');
  }

  getResultOptions() {
    return this.http.get(this.baseUrl + 'repairs/' + 'resultOptions');
  }
}

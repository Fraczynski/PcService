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

  getRepairsForUser(clientId: number, page?, itemsPerPage?): Observable<PaginatedResult<Repair[]>> {
    const paginatedResult: PaginatedResult<Repair[]> = new PaginatedResult<Repair[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
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

  addRepairToUser(clientId: number, repairNumber: any) {
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
    return this.http.post(this.baseUrl + 'repairs', repair)
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  baseUrl = environment.apiUrl + 'elements';

  constructor(private http: HttpClient) { }

  getElements(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Element[]>> {
    const paginatedResult: PaginatedResult<Element[]> = new PaginatedResult<Element[]>();

    const params = this.addParams(page, itemsPerPage, userParams);

    return this.http.get<Element[]>(this.baseUrl, { observe: 'response', params })
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

  getEquipmentElements(equipmentId) {
    return this.http.get(this.baseUrl + '/equipment/' + equipmentId);
  }

  addParams(page?, itemsPerPage?, userParams?): HttpParams {
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      if (userParams.clientName !== '' && userParams.clientName != null && userParams.clientName !== 'null') {
        params = params.append('clientName', userParams.clientName);
      }
      if (userParams.name !== '' && userParams.name != null && userParams.name !== 'null') {
        params = params.append('name', userParams.name);
      }
      if (userParams.status !== '' && userParams.status != null && userParams.status !== 'null') {
        params = params.append('status', userParams.status);
      }
      if (userParams.problemDescription !== '' && userParams.problemDescription != null && userParams.problemDescription !== 'null') {
        params = params.append('problemDescription', userParams.problemDescription);
      }
      if (userParams.minRequestDate !== '' && userParams.minRequestDate != null
        && userParams.minRequestDate !== 'null') {
        params = params.append('minRequestDate', userParams.minRequestDate.toDateString());
      }
      if (userParams.maxRequestDate !== '' && userParams.maxRequestDate != null
        && userParams.maxRequestDate !== 'null') {
        params = params.append('maxRequestDate', userParams.maxRequestDate.toDateString());
      }
      if (userParams.minReleaseDate !== '' && userParams.minReleaseDate != null
        && userParams.minReleaseDate !== 'null') {
        params = params.append('minReleaseDate', userParams.minReleaseDate.toDateString());
      }
      if (userParams.maxReleaseDate !== '' && userParams.maxReleaseDate != null
        && userParams.maxReleaseDate !== 'null') {
        params = params.append('maxReleaseDate', userParams.maxReleaseDate.toDateString());
      }
      if (userParams.orderBy !== '' && userParams.orderBy != null) {
        params = params.append('orderBy', userParams.orderBy);
      }
    }
    return params;
  }

}

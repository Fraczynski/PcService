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

  addElement(element: Element) {
    return this.http.post(this.baseUrl, element);
  }

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

  searchElement(elementId: number) {
    return this.http.get(this.baseUrl + '/' + elementId);
  }

  getServicemanElements(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Element[]>> {
    const paginatedResult: PaginatedResult<Element[]> = new PaginatedResult<Element[]>();

    const params = this.addParams(page, itemsPerPage, userParams);

    return this.http.get<Element[]>(this.baseUrl + '/serviceman', { observe: 'response', params })
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

  getUnassignedElements(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Element[]>> {
    const paginatedResult: PaginatedResult<Element[]> = new PaginatedResult<Element[]>();

    const params = this.addParams(page, itemsPerPage, userParams);

    return this.http.get<Element[]>(this.baseUrl + '/unassigned', { observe: 'response', params })
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

  assignElement(id: number) {
    return this.http.patch(this.baseUrl + '/assign', { id });
  }

  updateElement(element) {
    return this.http.put(this.baseUrl, element);
  }

  addParams(page?, itemsPerPage?, userParams?): HttpParams {
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      if (userParams.equipmentId !== '' && userParams.equipmentId != null && userParams.equipmentId !== 'null') {
        params = params.append('equipmentId', userParams.equipmentId);
      }
      if (userParams.servicemanName !== '' && userParams.servicemanName != null && userParams.servicemanName !== 'null') {
        params = params.append('servicemanName', userParams.servicemanName);
      }
      if (userParams.name !== '' && userParams.name != null && userParams.name !== 'null') {
        params = params.append('name', userParams.name);
      }
      if (userParams.status !== '' && userParams.status != null && userParams.status !== 'null') {
        params = params.append('status', userParams.status);
      }
      if (userParams.description !== '' && userParams.description != null && userParams.description !== 'null') {
        params = params.append('description', userParams.description);
      }
      if (userParams.warrantyRepair !== '' && userParams.warrantyRepair != null && userParams.warrantyRepair !== 'null') {
        params = params.append('warrantyRepair', userParams.warrantyRepair === 'Yes' ? 'true' : 'false');
      }
      if (userParams.minNewWarrantyPeriod !== '' && userParams.minNewWarrantyPeriod != null
        && userParams.minNewWarrantyPeriod !== 'null') {
        params = params.append('minNewWarrantyPeriod', userParams.minNewWarrantyPeriod.toDateString());
      }
      if (userParams.maxNewWarrantyPeriod !== '' && userParams.maxNewWarrantyPeriod != null
        && userParams.maxNewWarrantyPeriod !== 'null') {
        params = params.append('maxNewWarrantyPeriod', userParams.maxNewWarrantyPeriod.toDateString());
      }
      if (userParams.orderBy !== '' && userParams.orderBy != null) {
        params = params.append('orderBy', userParams.orderBy);
      }
    }
    return params;
  }

}

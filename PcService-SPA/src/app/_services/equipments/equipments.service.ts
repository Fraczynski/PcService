import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Equipment } from 'src/app/_models/equipment';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  private baseUrl = environment.apiUrl + 'equipments';

  constructor(private http: HttpClient) { }

  getClientEquipments(clientId?, page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Equipment[]>> {
    const paginatedResult: PaginatedResult<Equipment[]> = new PaginatedResult<Equipment[]>();

    const params = this.addParams(page, itemsPerPage, userParams);

    if (clientId == null) {
      clientId = '';
    }

    return this.http.get<Equipment[]>(this.baseUrl + '/' + clientId, { observe: 'response', params })
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

  addEquipment(equipment) {
    return this.http.post(this.baseUrl, equipment);
  }

  getAllEquipments(page?, itemsPerPage?, userParams?) {
    // const paginatedResult: PaginatedResult<Equipment[]> = new PaginatedResult<Equipment[]>();
    // let params = new HttpParams();

    // return this.http.get<Equipment[]>(this.baseUrl, { observe: 'response', params })
    //   .pipe(
    //     map(response => {
    //       console.log(response);
    //       paginatedResult.result = response.body;
    //       if (response.headers.get('Pagination') != null) {
    //         paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    //       }
    //       return paginatedResult;
    //     })
    //   );
  }

  updateEquipment(equipmentId: number, equipment) {
    this.http.put(this.baseUrl + '/' + equipmentId, equipment);
  }

  assignClientToEquipment(equipmentId: number, clientId: number) {
    return this.http.patch(this.baseUrl + '/' + equipmentId + '/assign', { clientId });
  }

  updateStatus(equipmentId: number, status) {
    return this.http.patch(this.baseUrl + '/' + equipmentId + '/status', status);
  }

  getStatusList(clientId: number) {
    if (clientId) {
      return this.http.get(this.baseUrl + '/' + clientId + '/statusList');
    } else {
      return this.http.get(this.baseUrl + '/statusList');
    }
  }

  addParams(page?, itemsPerPage?, userParams?): HttpParams {
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
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

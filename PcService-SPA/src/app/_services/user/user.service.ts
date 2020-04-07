import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../../_models/repair';
import { PaginatedResult } from '../../_models/pagination';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  checkUserExists(clientName: string) {
    return this.http.get(this.baseUrl + '/' + clientName);
  }

  getProfile() {
    return this.http.get(this.baseUrl);
  }

  editProfile(profile) {
    return this.http.put(this.baseUrl + '/edit', profile);
  }
}

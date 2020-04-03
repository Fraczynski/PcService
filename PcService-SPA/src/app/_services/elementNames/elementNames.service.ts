import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElementNamesService {
  baseUrl = environment.apiUrl + 'elementNames';

  constructor(private http: HttpClient) { }

  getElementNamesList() {
    return this.http.get(this.baseUrl);
  }

  addElementName(name) {
    return this.http.post(this.baseUrl, name);
  }
}

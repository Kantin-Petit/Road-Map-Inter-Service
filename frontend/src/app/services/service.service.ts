import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceList } from '../models/serviceList-model';
import { Service } from '../models/service-model';
import { API } from '../routes/api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllService(): Observable<{ [key: string]: Service }> {
    return this.http.get<{ [key: string]: Service }>(`${this.apiUrl}/${API.ALL_SERVICE}`);
  }

  getService(serviceName: string) {
    return this.http.get<{ [key: string]: Service }>(`${this.apiUrl}/${API.ONE_SERVICE}/${serviceName}`);
  }

  getAllServiceName() {
    return this.http.get<string[]>(`${this.apiUrl}/${API.LIST_SERVICE}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    return this.http.get<{ [key: string]: Service }>(`${this.apiUrl}/${API.SERVICE}`);
  }

  getService(serviceName: string, sujet: string[]) {
    return this.http.get<{ [key: string]: Service }>(`${this.apiUrl}/${API.SERVICE}/${serviceName}?sujet=${sujet}`);
  }

  getServicefiltered(service: string, sujet: string) {
    return this.http.get<{ [key: string]: Service }>(`${this.apiUrl}/${API.SERVICE_FILTERED}?service=${service}&sujet=${sujet}`);
  }

}

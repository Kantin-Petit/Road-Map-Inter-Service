import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceModel } from '../models/service-model';
import { API } from '../routes/api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllService(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${this.apiUrl}/${API.SERVICE}`);
  }

  getService(serviceName: string): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.apiUrl}/${API.SERVICE}/${serviceName}`);
  }

}

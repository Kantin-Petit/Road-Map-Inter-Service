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

  getServiceName(serviceId: number): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.apiUrl}/${API.SERVICE}/${serviceId}`);
  }

  createservice(service: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.apiUrl}/${API.SERVICE}`, service);
  }

  updateservice(id: number, service: ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.apiUrl}/${API.SERVICE}/${id}`, service);
  }

  deleteservice(id: number): Observable<ServiceModel> {
    return this.http.delete<ServiceModel>(`${this.apiUrl}/${API.SERVICE}/${id}`);
  }

}

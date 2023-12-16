import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service-model';
import { API } from '../routes/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/${API.ALL_SERVICE}`);

    
  }

  getService(serviceId: number) {
    return this.http.get<Service>(`${this.apiUrl}/${API.ONE_SERVICE}/${serviceId}`);
  }
}

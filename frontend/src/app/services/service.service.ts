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

  getAllService(): Observable<{ [key: string]: ServiceModel }> {
    return this.http.get<{ [key: string]: ServiceModel }>(`${this.apiUrl}/${API.SERVICE}`);
  }

  getListService(): Observable<{ [key: string]: { name: string } }> {
    return this.http.get<{ [key: string]: { name: string } }>(`${this.apiUrl}/${API.SERVICE_LIST}`);
  }

  getService(serviceName: string, thematic: string[] | null): Observable<{ [key: string]: ServiceModel }> {
    return this.http.get<{ [key: string]: ServiceModel }>(`${this.apiUrl}/${API.SERVICE}/${serviceName}?thematic=${thematic}`);
  }

  getfilteredService(data: any): Observable<{ [key: string]: ServiceModel }> {
    return this.http.post<any>(`${this.apiUrl}/${API.SERVICE_FILTERED}`, data);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API } from '../routes/api';
import { Observable, map } from 'rxjs';
import { ThematicModel } from '../models/thematic-model';

@Injectable({
  providedIn: 'root'
})
export class ThematicService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllthematic(): Observable<ThematicModel[]> {
    return this.http.get<ThematicModel[]>(`${this.apiUrl}/${API.THEMATIC}`);
  }

  getOnethematic(id: number): Observable<ThematicModel> {
    return this.http.get<ThematicModel>(`${this.apiUrl}/${API.THEMATIC}/${id}`);
  }

  createthematic(thematic: ThematicModel): Observable<ThematicModel> {
    return this.http.post<ThematicModel>(`${this.apiUrl}/${API.THEMATIC}`, thematic);
  }

  updatethematic(id: number, thematic: ThematicModel): Observable<ThematicModel> {
    return this.http.put<ThematicModel>(`${this.apiUrl}/${API.THEMATIC}/${id}`, thematic);
  }

  deletethematic(id: number): Observable<ThematicModel> {
    return this.http.delete<ThematicModel>(`${this.apiUrl}/${API.THEMATIC}/${id}`);
  }

}

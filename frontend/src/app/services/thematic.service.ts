import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API } from '../routes/api';
import { Observable, map } from 'rxjs';
import { Thematic } from '../models/thematic-model';

@Injectable({
  providedIn: 'root'
})
export class ThematicService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllthematic(): Observable<{ [key: string]: Thematic }> {
    return this.http.get<{ [key: string]: Thematic }>(`${this.apiUrl}/${API.THEMATIC}`);
  }

  getOnethematic(name: string): Observable<Thematic> {
    return this.http.get<Thematic>(`${this.apiUrl}/${API.THEMATIC}/${name}`);
  }

  createthematic(thematic: Thematic): Observable<Thematic> {
    return this.http.post<Thematic>(`${this.apiUrl}/${API.THEMATIC}`, thematic);
  }

  updatethematic(id: number, thematic: Thematic): Observable<Thematic> {
    return this.http.put<Thematic>(`${this.apiUrl}/${API.THEMATIC}/${id}`, thematic);
  }

  deletethematic(id: number): Observable<Thematic> {
    return this.http.delete<Thematic>(`${this.apiUrl}/${API.THEMATIC}/${id}`);
  }

}

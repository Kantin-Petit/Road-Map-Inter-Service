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
    return this.http.get<{ [key: string]: Thematic }>(`${this.apiUrl}/${API.SUBJECT}`);
  }

}

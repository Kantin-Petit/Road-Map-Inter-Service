import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API } from '../routes/api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getFilteredSubjects(service: string, sujet: string,): any {
    return this.http.get<any[]>(`${this.apiUrl}/${API.TIMELINES_SUBJECT_FILTERED}?service=${service}&option=${sujet}`)
  }
}

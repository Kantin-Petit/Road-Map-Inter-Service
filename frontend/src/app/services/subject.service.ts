import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API } from '../routes/api';
import { Observable, map } from 'rxjs';
import { Subject } from '../models/subject-model';



@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllsubject(): Observable<{ [key: string]: Subject }> {
    return this.http.get<{ [key: string]: Subject }>(`${this.apiUrl}/${API.SUBJECT}`);
  }

  getFilteredSubjects(service: string, sujet: string,): object {
    return this.http.get<object[]>(`${this.apiUrl}/${API.SUBJECT_FILTERED}?service=${service}&sujet=${sujet}`)
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TimelineModelWithService } from '../models/timeline-model';
import { API } from '../routes/api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllTimeline(): Observable<TimelineModelWithService[]> {
    return this.http.get<TimelineModelWithService[]>(`${this.apiUrl}/${API.TIMELINE}`);
  }

  getfilteredTiemline(data: any): Observable<TimelineModelWithService[]> {
    return this.http.post<TimelineModelWithService[]>(`${this.apiUrl}/${API.TIMELINE_FILTERED}`, data);
  }
}

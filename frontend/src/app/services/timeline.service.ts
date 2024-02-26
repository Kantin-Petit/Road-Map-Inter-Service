import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TimelineModel, TimelineModelWithService } from '../models/timeline-model';
import { API } from '../routes/api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  private option_thematic!: number;

  getOptionThematic(): number {
    return this.option_thematic;
  }

  setOptionThematic(option_thematic: number): void {
    this.option_thematic = option_thematic;
  }

  getAllTimeline(): Observable<TimelineModelWithService[]> {
    return this.http.get<TimelineModelWithService[]>(`${this.apiUrl}/${API.TIMELINE}`);
  }

  getTimelineById(id: number): Observable<TimelineModel> {
    return this.http.get<TimelineModel>(`${this.apiUrl}/${API.TIMELINE}/${id}`);
  }

  getFilteredTimeline(data: any): Observable<TimelineModelWithService[]> {
    return this.http.post<TimelineModelWithService[]>(`${this.apiUrl}/${API.TIMELINE_FILTERED}`, data);
  }

  getListTimeline(data: string): Observable<TimelineModel[]> {
    return this.http.post<TimelineModel[]>(`${this.apiUrl}/${API.TIMELINE_LIST}`, data);
  }

  createTimeline(timeline: TimelineModel | FormData): Observable<any> {
    return this.http.post<TimelineModel>(`${this.apiUrl}/${API.TIMELINE}`, timeline);
  }

  updateTimeline(id: number, timeline: TimelineModel | FormData): Observable<TimelineModel> {
    return this.http.put<TimelineModel>(`${this.apiUrl}/${API.TIMELINE}/${id}`, timeline);
  }

  deleteTimeline(id: number, service_id: number): Observable<TimelineModel> {
    return this.http.delete<TimelineModel>(`${this.apiUrl}/${API.TIMELINE}/${id}/${service_id}`);
  }

}

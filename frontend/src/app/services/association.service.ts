import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AssociationModel } from '../models/association-model';
import { API } from 'src/app/routes/api';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAssociation(id: number): Observable < AssociationModel[] > {
    return this.http.get<AssociationModel[]>(`${this.apiUrl}/${API.ASSOCIATION}/${id}`);
  }

}

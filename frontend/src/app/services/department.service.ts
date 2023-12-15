import { Component, OnInit, ViewChild  } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department-model';
import { Observable } from 'rxjs';
import { API } from 'src/app/routes/api';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements OnInit{

  constructor(private http: HttpClient) { 

  }

  private apiUrl = environment.apiUrl;


  ngOnInit(): void {
  
  }

  allService(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/services/allservice`);
  }

}

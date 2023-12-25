import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin, UserRegistration } from '../interfaces/auth';
import { environment } from 'src/environments/environment';
import { API } from 'src//app/routes/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${API.REGISTER}`, userData);
  }

  login(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/${API.SIGNIN}`, userData, { withCredentials: true });
  }

}

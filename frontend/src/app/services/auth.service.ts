import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin, UserRegistration } from '../interfaces/auth';
import { environment } from 'src/environments/environment';
import { API } from 'src//app/routes/api';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private User!: UserModel;
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router) { }


  setToken(token: string | null): void {
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${API.REGISTER}`, userData);
  }

  login(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/${API.SIGNIN}`, userData, { withCredentials: true });
  }

  verifyToken(): Observable<any>{
    return this.http.get(`${this.apiUrl}/${API.TOKEN}`, { withCredentials: true });
  }

  setUser(user: UserModel) {
    this.User = user;
  }

  getUser(): UserModel {
    return this.User;
  }

  logout() {
    this.http.get(`${this.apiUrl}/${API.SIGNOUT}`, { withCredentials: true }).subscribe(() => {
      this.setToken(null);
      this.User = new UserModel();
      this.router.navigate(['/']);
    });
  }

  getRole() {
    return this.getUser().role;
  }
}

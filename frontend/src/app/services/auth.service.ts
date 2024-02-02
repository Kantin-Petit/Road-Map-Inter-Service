import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin, UserRegistration } from '../interfaces/auth';
import { environment } from 'src/environments/environment';
import { API } from 'src//app/routes/api';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  private User!: UserModel;
  private accessToken!: boolean;

  constructor(private http: HttpClient) {}

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${API.REGISTER}`, userData);
  }

  login(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/${API.SIGNIN}`, userData, { withCredentials: true });
  }

  verifyToken() {
    return this.http.get(`${this.apiUrl}/${API.TOKEN}`, { withCredentials: true });
  }

  setToken(token : boolean){
    this.accessToken = token;
  }

  getToken(){
    return this.accessToken;
  }

  setUser(user: UserModel) {
    this.User = user;
  }

  getUser(): UserModel {
    return this.User;
  }

  logout() {
    this.accessToken = false;
    this.User = new UserModel();
    this.http.get(`${this.apiUrl}/${API.SIGNOUT}`, { withCredentials: true }).subscribe();
  }

  getRole(){
      return this.getUser().role;
  }

}

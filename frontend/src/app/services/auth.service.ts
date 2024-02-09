import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin, UserRegistration } from '../interfaces/auth';
import { environment } from 'src/environments/environment';
import { API } from 'src//app/routes/api';
import { UserModel } from '../models/user-model';
import { AppComponent } from '../app.component';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private User!: UserModel;
  private accessToken!: string | null;


  constructor(private http: HttpClient,
    private userService: UserService) {
  }

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${API.REGISTER}`, userData);
  }

  login(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/${API.SIGNIN}`, userData, { withCredentials: true });
  }

  verifyToken() {
    return this.http.get(`${this.apiUrl}/${API.TOKEN}`, { withCredentials: true });
  }

  getId() {
    const token = this.accessToken;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['id'];
    }
    return null;
  }

  setToken(token : string){
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

  isLogged() {
    if(this.accessToken != null){
      return true;
    }
    return false;
  }

  logout() {
    this.http.get(`${this.apiUrl}/${API.SIGNOUT}`, { withCredentials: true }).subscribe({
      next: () => {
        this.accessToken = null;
        this.User = new UserModel();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getRole(){
      return this.getUser().role;
  }

}

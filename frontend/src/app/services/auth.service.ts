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
  private accessToken!: string;


  constructor(private http: HttpClient,
    private userService: UserService) {
  }

  ngONInit() {
    console.log(this.getId());
  }

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${API.REGISTER}`, userData);
  }

  login(userData: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/${API.SIGNIN}`, userData, { withCredentials: true });
  }

  verifyToken(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const response = this.http.get(`${this.apiUrl}/${API.TOKEN}`, { withCredentials: true });
    response.subscribe(
      (data: any) => {
        this.accessToken = data.accessToken;
        resolve();  // Résout la promesse une fois que le token est récupéré
      },
      (error) => {
        console.error('Erreur lors de la vérification du token', error);
        reject(error);  // Rejette la promesse en cas d'erreur
      }
    );
  });
}

  getId() {
    const token = this.accessToken;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['id'];
    }
    return null;
  }

  setUser(id: number) {
    this.userService.getOneUser(id).subscribe((data: UserModel) => {
      localStorage.setItem('user', JSON.stringify(data));
    });
  }

  getUser(): UserModel {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  hasUser() {
    return !!this.User;
  }

  isLogged() {
    if(this.accessToken)
      return true;
    return false;
  }

  logout() {
    this.accessToken = '';
    localStorage.removeItem('user');
    this.http.get(`${this.apiUrl}/${API.SIGNOUT}`, { withCredentials: true }).subscribe();
  }

  getRole(){
      return this.getUser().role;
  }

}

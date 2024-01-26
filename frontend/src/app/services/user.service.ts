import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../models/user-model';
import { environment } from 'src/environments/environment';
import { API } from 'src/app/routes/api';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;


  // Ajouter le widthcredentials: true
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${API.USER}`);
  }

  // getOneUser(userId): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/${API.USER}/${userId}`);
  // }

  deleteUser(userId: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.apiUrl}/${API.USER}/${userId}`);
  }

  modifyUser(userId: number, user: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.apiUrl}/${API.USER}/${userId}`, user);
  }

  ////////////////////////////////////////////


  clean(): void {
    window.sessionStorage.clear();
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem('jwt');
    window.sessionStorage.setItem('jwt', token);
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.jwt;
  }

  logout(): void {
    window.sessionStorage.clear();
  }
}



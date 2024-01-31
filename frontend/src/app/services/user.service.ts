import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel} from '../models/user-model';
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
  getAllUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/${API.USER}`);
  }

  // getOneUser(userId): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/${API.USER}/${userId}`);
  // }

  deleteUser(userId: number): Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${this.apiUrl}/${API.USER}/${userId}`);
  }

  modifyUser(userId: number, user: UserModel): Observable<UserModel[]> {
    return this.http.put<UserModel[]>(`${this.apiUrl}/${API.USER}/${userId}`, user);
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

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}



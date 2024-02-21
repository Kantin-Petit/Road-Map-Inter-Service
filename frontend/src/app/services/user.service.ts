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


  getAllUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/${API.USER}`);
  }

  getAllUserByService(serviceId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/${API.USER_SERVICE}/${serviceId}`);
  }

  getOneUser(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${API.USER}/${userId}`);
  }

  deleteUser(userId: number): Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${this.apiUrl}/${API.USER}/${userId}`);
  }

  modifyUser(userId: number, user: UserModel): Observable<UserModel[]> {
    return this.http.put<UserModel[]>(`${this.apiUrl}/${API.USER}/${userId}`, user);
  }
}

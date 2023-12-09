import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredential } from '../_interfaces/credential';
import { IToken } from '../_interfaces/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url=' http://localhost:3000/api/auth/signin';

  constructor(private http: HttpClient) { }

  login(credential: ICredential): Observable<IToken>{
    return this.http.post<IToken>(this.url, credential)
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  savedToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    return !! localStorage.getItem('token');
  }
}

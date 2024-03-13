import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  hasToken: String | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getToken().subscribe(hasOne => {
      this.hasToken = hasOne;
    });
  }

  logout() {
    this.authService.logout();
  }
}

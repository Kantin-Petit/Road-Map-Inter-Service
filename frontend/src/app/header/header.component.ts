import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  hasToken: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.hasToken$.subscribe(hasOne => {
      this.hasToken = hasOne;
    });
  }

  logout() {
    this.authService.logout();
  }
}

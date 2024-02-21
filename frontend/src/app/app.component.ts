import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Inter-Service';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.verifyToken().subscribe(
      reponse => {
        if (!reponse.accessToken) return
        this.authService.setToken(reponse.accessToken);
        const decodeToken: any = jwtDecode(reponse.accessToken);
        this.userService.getOneUser(decodeToken.id).subscribe(
          userData => {
            this.authService.setUser(userData);
          });
      },
    );
  }
}


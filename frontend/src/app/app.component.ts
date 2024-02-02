import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private apiUrl = environment.apiUrl;

  title = 'Inter-Service';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(){
      this.authService.verifyToken().subscribe({
          next: (reponse: any) => {
            const decodeToken: any = jwtDecode(reponse.accessToken);
            this.userService.getOneUser(decodeToken.id).subscribe(
              userData => {
                this.authService.setUser(userData);
                this.authService.setToken(true);
            });

          },
          error: (error: any) => {
          },
          complete: () => {
          }
        }
      );
  }
}


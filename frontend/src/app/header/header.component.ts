import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) { }
  
  logout() {
    if (localStorage.getItem('token'))
    {
      localStorage.removeItem('token');
      this.router.navigate(['/connexion']);
    }else{
      this.router.navigate(['/']);
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private apiUrl = environment.apiUrl;

  title = 'Inter-Service';

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    
    try {
      await this.authService.verifyToken();  // Attend la fin de la vérification du token
      const id = this.authService.getId();  // Récupère l'ID après la vérification du token
      this.authService.setUser(id);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
    }
  }
}


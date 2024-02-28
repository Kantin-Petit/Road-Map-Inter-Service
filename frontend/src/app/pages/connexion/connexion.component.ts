import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {

  loginForm!: FormGroup;
  loginObserver$!: Observable<UserLogin>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService) {

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.loginObserver$ = this.loginForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
      }))
    );
  }

  getRouter() {
    return this.router;
  }

  onSubmit() {

    if (this.loginForm.valid) {

      const formData: UserLogin = this.loginForm.value;
      this.authService.login(formData).subscribe({
        next: (reponse) => {
          this.userService.getOneUser(reponse.id).subscribe(userData => {
            this.authService.setToken(reponse.accessToken);
            this.authService.setUser(userData);
            this.router.navigate(['/dashboard']);
          });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Adresse e-mail ou mot de passe incorrect.' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir correctement tous les champs.' });
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  loginForm!: FormGroup;
  loginObserver$!: Observable<UserLogin>;
  
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
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

  
  async onSubmit() {

    if (this.loginForm.valid) {
      try{
        const formData: UserLogin = this.loginForm.value;
        await this.authService.login(formData).toPromise();
        await this.authService.verifyToken();  // Attend la fin de la vérification du token
        const id = this.authService.getId();  // Récupère l'ID après la vérification du token
        this.authService.setUser(id);  // Récupère l'utilisateur après la vérification du token
        this.router.navigate(['']);
      }catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      }
      
      
    }
            
  }
}

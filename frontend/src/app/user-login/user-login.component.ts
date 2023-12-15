import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../interfaces/user-login';
import { Router } from '@angular/router';

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
    private router: Router) { 
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

  
  onSubmit() {

    if (this.loginForm.valid) {

      const formData: UserLogin = this.loginForm.value;
      this.authService.login(formData).subscribe(
        (response) => {
          console.log(response); 
          // this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
            
    }
  } 

}

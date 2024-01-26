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

  
  onSubmit() {

    if (this.loginForm.valid) {

      const formData: UserLogin = this.loginForm.value;
      this.authService.login(formData).subscribe(response => {
          console.log(response); 
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
            
    }
  } 

}

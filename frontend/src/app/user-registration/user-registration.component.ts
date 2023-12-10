import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRegistration } from '../interfaces/user-registration';
import { passwordMatchValidator } from '../shared/password-match.directive';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})

export class UserRegistrationComponent {

  registrationForm: FormGroup;
  registerObserver$!: Observable<UserRegistration>;
  urlRegex!: RegExp;

  emailExists = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.urlRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    this.registrationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      role: ['Informatique', Validators.required]
    }, {
      validators: passwordMatchValidator
    });

    this.registerObserver$ = this.registrationForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
      }))
    );
    
  }

  onSubmit() {

    if (this.registrationForm.valid) {

      const formData: UserRegistration = this.registrationForm.value;
      this.authService.register(formData).subscribe(
        (response) => {
          console.log(response); 
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
            
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ngOnInit(): void {
    
  }

  resetForm!: FormGroup;
  resetObserver$!: Observable<Object>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {

    this.resetForm = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    this.resetObserver$ = this.resetForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
      }))
    );
  }

  getRouter() {
    return this.router;
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])([a-zA-Z0-9\S]){8,}$/;
    return passwordRegex.test(password);
  }

  onSubmit() {

    if (this.resetForm.valid) {

      const dataForm = this.resetForm.value;

      if (dataForm.password && dataForm.password.length > 0) {

        if (dataForm.password && !this.validatePassword(dataForm.password)) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le mot de passe exige au moins 8 caractères et doit comporter au moins : 1 chiffre, 1 lettre majuscule, 1 lettre minuscule et un caractère special', life: 3000 });
          return;
        }

        if (dataForm.password && dataForm.password !== dataForm.confirmPassword) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les mots de passe ne correspondent pas', life: 3000 });
          return;
        }

      }

      const formData = { password: dataForm.password, token: this.router.url.split('/').pop()}
      this.authService.resetNewPassword(formData).subscribe({
        next: (reponse) => {
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          const message = 'Une erreur est survenue, veuillez réessayer plus tard.';
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
        }
      });
     } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir correctement tous les champs.' });
    }
  }


}

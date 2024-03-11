import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotForm!: FormGroup;
  forgotObserver$!: Observable<Object>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) {

    this.forgotForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.forgotObserver$ = this.forgotForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
      }))
    );
  }

  onSubmit() {

    if (this.forgotForm.valid) {

      const dataForm = this.forgotForm.value;

      const formData = { email: dataForm.email }
      this.authService.resetPassword(formData).subscribe({
        next: (reponse) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot de passe envoyé. Veuillez vérifier votre boîte mail.', life: 3500 });
        },
        error: (error) => {
          const message = error.status === 429 ? 'Trop de tentatives de connexion. Veuillez réessayer plus tard.' : 'Une erreur est survenue, veuillez réessayer plus tard.';
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir correctement le formulaire.' });
    }
  }

}

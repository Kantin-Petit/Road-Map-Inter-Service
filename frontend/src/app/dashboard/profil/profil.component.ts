import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [MessageService]
})
export class ProfilComponent implements OnInit{

  utilisateurDialog: boolean = false;
  submitted: boolean = false;
  utilisateur!: UserModel;
  newPassword!: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.utilisateur = this.authService.getUser();
  }

  editUser() {
    this.utilisateurDialog = true;
    this.submitted = false;
    delete this.utilisateur.password;
    this.newPassword = '';
  }

  hideDialog() {
    this.utilisateurDialog = false;
    this.submitted = false;
  }

  validateUser(): boolean {
    return (
      Boolean(this.utilisateur.first_name) &&
      Boolean(this.utilisateur.last_name) &&
      Boolean(this.utilisateur.email)
    );
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])([a-zA-Z0-9\S]){8,}$/;
    return passwordRegex.test(password);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  saveUser() {
    this.submitted = true;

    if (this.utilisateur.email && !this.validateEmail(this.utilisateur.email)) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez saissir un email valide', life: 3000 });
      return;
    }

    if (this.utilisateur.password && this.utilisateur.password.length > 0) {

      if (this.utilisateur.password && !this.validatePassword(this.utilisateur.password)) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le mot de passe exige au moins 8 caractères et doit comporter au moins : 1 chiffre, 1 lettre majuscule, 1 lettre minuscule et un caractère special', life: 3000 });
        return;
      }

      if (this.utilisateur.password && this.utilisateur.password !== this.newPassword) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les mots de passe ne correspondent pas', life: 3000 });
        return;
      }

    }

    this.userService.modifyUser(this.utilisateur.id, this.utilisateur).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
      delete this.utilisateur.password;
    });
    this.utilisateurDialog = false;
    this.submitted = false;
    this.newPassword = '';
  }
}

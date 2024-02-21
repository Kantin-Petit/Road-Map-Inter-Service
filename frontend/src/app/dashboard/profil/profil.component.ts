import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{

  utilisateurDialog: boolean = false;
  submitted: boolean = false;
  utilisateur!: UserModel;

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
  }

  saveUser() {
    this.submitted = true;
    this.userService.modifyUser(this.utilisateur.id, this.utilisateur).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
    });
    this.utilisateurDialog = false;
  }
}

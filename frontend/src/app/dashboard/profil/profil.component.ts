import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  utilisateurDialog: boolean = false;
  // utilisateur: UserModel = this.userService.getUser();

  constructor(
    private userService: UserService
  ) { }

  editUser(utilisateur: UserModel) {
    this.utilisateurDialog = true;
  }

}

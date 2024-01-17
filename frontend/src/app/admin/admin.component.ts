import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { Table } from 'primeng/table';
import { ServiceService } from '../services/service.service'
import { Subject } from '../models/subject-model';
import { Observable } from 'rxjs';
import { UserRegistration, UserRole } from '../interfaces/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService, ConfirmationService]

})

export class AdminComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  utilisateurs!: User[];
  utilisateur!: User;
  utilisateurDialog: boolean = false;
  selectedUsers!: User[] | null;
  submitted: boolean = false;
  statuses!: any[];
  Delete!: string;
  service!: Subject[];
  createUser: boolean = false

  constructor(
    private userService: UserService,
    private ServiceService: ServiceService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(users => {
      this.utilisateurs = users;
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, 'contains');
  }

  openNew() {
    this.createUser = true;
    this.utilisateur = new User();
    this.submitted = false;
    this.utilisateurDialog = true;
  }

  onDialogHide() {
    if (!this.utilisateurDialog) this.createUser = false;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        if (!this.selectedUsers) return
        this.selectedUsers.forEach(user => {
          this.userService.deleteUser(user['id']).subscribe();
        });

        this.utilisateurs = this.utilisateurs.filter((val) => !this.selectedUsers?.includes(val));
        this.selectedUsers = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur Supprimer', life: 3000 });

      }
    });
  }

  editUser(utilisateur: User) {
    this.utilisateur = { ...utilisateur };
    this.utilisateurDialog = true;
  }

  deleteUser(utilisateur: User) {
    console.log(utilisateur['id'])
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + utilisateur.last_name + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        this.userService.deleteUser(utilisateur['id']).subscribe(() => {
          this.utilisateurs = this.utilisateurs.filter((val) => val.id !== utilisateur.id);
          this.utilisateur = new User();
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur supprimé', life: 3000 });
        },
        );
      }
    });
  }

  hideDialog() {
    this.utilisateurDialog = false;
    this.createUser = false;
    this.submitted = false;
  }


  saveUser() {
    this.submitted = true;

    if (this.utilisateur.last_name?.trim()) {

      if (this.utilisateur.id) {
        this.utilisateurs[this.findIndexById(String(this.utilisateur.id))] = this.utilisateur;
        this.userService.modifyUser(this.utilisateur.id, this.utilisateur).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
        });
      
      } else {

        const formData: UserRegistration = {
          firstName: this.utilisateur.first_name,
          lastName: this.utilisateur.last_name,
          email: this.utilisateur.email,
          password: this.utilisateur.password,
          service: this.utilisateur.serviceId,
          role: UserRole.ADMIN
        };

        this.utilisateurs.push(this.utilisateur);
        this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Créer', life: 3000 });
        this.authService.register(formData).subscribe(response => {
          console.log(response);
        }
        );

      }

      this.utilisateurs = [...this.utilisateurs];
      this.utilisateurDialog = false;
      this.createUser = false;
      this.utilisateur = new User();
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    const numericId = Number(id);
    for (let i = 0; i < this.utilisateurs.length; i++) {
      if (this.utilisateurs[i].id === numericId) {
        index = i;
        break;
      }
    }

    return index;
  }

}



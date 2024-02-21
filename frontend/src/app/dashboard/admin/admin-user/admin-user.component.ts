import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../models/user-model';
import { Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { Table } from 'primeng/table';
import { ServiceService } from '../../../services/service.service'
import { ThematicModel } from '../../../models/thematic-model';
import { UserRegistration, UserRole } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';
import { ServiceModel } from 'src/app/models/service-model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class AdminUserComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  utilisateurs!: UserModel[];
  utilisateur!: UserModel;
  utilisateurDialog: boolean = false;
  selectedUsers!: UserModel[] | null;
  submitted: boolean = false;
  Delete!: string;
  service!: ThematicModel[];
  createUser: boolean = false
  serviceList!: ServiceModel[];
  roleList!: string[];
  myRole!: string;
  newPassword!: string;

  constructor(
    private userService: UserService,
    private ServiceService: ServiceService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    if (this.authService.getUser().role === 'admin') {

      this.userService.getAllUser().subscribe(users => {
        this.utilisateurs = users;
        console.log(this.utilisateurs)

      });

      this.ServiceService.getAllService().subscribe(services => {
        this.serviceList = services;
      });

      this.roleList = ['admin', 'admin_service', 'user'];
    } else {

      const userServiceId = this.authService.getUser().service_id;

      this.userService.getAllUserByService(userServiceId).subscribe(users => {
        this.utilisateurs = users;
      });

    }

    this.myRole = this.authService.getUser().role;


  }

  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, 'contains');
  }

  openNew() {
    this.createUser = true;
    this.utilisateur = new UserModel();
    this.submitted = false;
    this.utilisateurDialog = true;
  }

  updateServiceName(serviceId: number) {
    const selectedService = this.serviceList.find(service => service.id === serviceId);

    if (selectedService) {
      if (!this.utilisateur.Service) this.utilisateur.Service = { name: '' };
      this.utilisateur.Service.name = selectedService.name;
    }
  }

  onDialogHide() {
    if (!this.utilisateurDialog) this.createUser = false;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les Utilisateurs sélectionnés ?',
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

  editUser(utilisateur: UserModel) {
    this.utilisateur = { ...utilisateur };
    this.utilisateurDialog = true;
  }

  deleteUser(utilisateur: UserModel) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + utilisateur.last_name + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        this.userService.deleteUser(utilisateur['id']).subscribe(() => {
          this.utilisateurs = this.utilisateurs.filter((val) => val.id !== utilisateur.id);
          this.utilisateur = new UserModel();
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

  validateUser(): boolean {
    return (
      Boolean(this.utilisateur.first_name) &&
      Boolean(this.utilisateur.last_name) &&
      Boolean(this.utilisateur.email) &&
      Boolean(this.utilisateur.password) &&
      Boolean(this.utilisateur.service_id || this.utilisateur.role === 'admin') &&
      Boolean(this.utilisateur.role)
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

    console.log(this.utilisateur)


    if (this.utilisateur.email && !this.validateEmail(this.utilisateur.email)) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez saissir un email valide', life: 3000 });
      return;
    }

    if (this.utilisateur.last_name?.trim()) {


      if (this.utilisateur.role === 'admin') {
        if (!this.utilisateur.Service) this.utilisateur.Service = { name: '' };
        this.utilisateur.service_id = null;
      } else {
        this.updateServiceName(Number(this.utilisateur.service_id));
      }

      if (this.utilisateur.id) {

        if (this.utilisateur.password && this.utilisateur.password.length > 0) {

          console.log('tu es la')

          console.log(this.utilisateur)

          if (this.utilisateur.password && !this.validatePassword(this.utilisateur.password)) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le mot de passe exige au moins 8 caractères et doit comporter au moins : 1 chiffre, 1 lettre majuscule, 1 lettre minuscule et un caractère special', life: 3000 });
            return;
          }

          if (this.utilisateur.password && this.utilisateur.password !== this.newPassword) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les mots de passe ne correspondent pas', life: 3000 });
            return;
          }

        }

        this.utilisateurs[this.findIndexById(String(this.utilisateur.id))] = this.utilisateur;

        if (this.utilisateur.id == this.authService.getUser().id) {
          this.authService.setUser(this.utilisateur);
        }

        this.userService.modifyUser(this.utilisateur.id, this.utilisateur).subscribe(() => {
          this.newPassword = '';
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
          this.utilisateurs = [...this.utilisateurs];
          this.utilisateur = new UserModel();
        });

      } else {

        if (this.utilisateur.password && !this.validatePassword(this.utilisateur.password)) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le mot de passe exige au moins 8 caractères et doit comporter au moins : 1 chiffre, 1 lettre majuscule, 1 lettre minuscule et un caractère special', life: 3000 });
          return;
        }

        if (this.utilisateur.password !== this.newPassword) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les mots de passe ne correspondent pas', life: 3000 });
          return;
        }

        const formData: UserRegistration = {
          firstName: this.utilisateur.first_name,
          lastName: this.utilisateur.last_name,
          email: this.utilisateur.email,
          password: this.utilisateur.password,
          service: this.utilisateur.service_id,
          role: this.utilisateur.role as UserRole
        };

        if (!this.validateUser()) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs', life: 3000 });
          return;
        }

        this.authService.register(formData).subscribe({
          next: (response) => {
            this.newPassword = '';
            this.utilisateur.role === 'admin' ? response.user.Service = null : response.user.Service = this.utilisateur.Service
            this.utilisateurs.push(response.user);
            console.log(this.utilisateur)
            console.log(response.user);
            console.log(this.utilisateurs);
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Créé', life: 3000 });
            this.utilisateurs = [...this.utilisateurs];
            this.utilisateur = new UserModel();
          },
          error: (error) => {
            this.newPassword = '';
            this.utilisateur = new UserModel();
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création de l\'utilisateur', life: 3000 });
          }
        });

      }

      this.utilisateurDialog = false;
      this.createUser = false;
      this.submitted = false;
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

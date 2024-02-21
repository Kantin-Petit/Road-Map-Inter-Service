import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../models/user-model';
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


  saveUser() {
    this.submitted = true;

    if (this.utilisateur.last_name?.trim()) {

      if (this.utilisateur.role === 'admin') {
        if (!this.utilisateur.Service) this.utilisateur.Service = { name: '' };
        this.utilisateur.Service.name = 'Aucun';
        this.utilisateur.service_id = 0;
      } else {
        this.updateServiceName(Number(this.utilisateur.service_id));

      }

      if (this.utilisateur.id) {
        this.utilisateurs[this.findIndexById(String(this.utilisateur.id))] = this.utilisateur;
        if (this.utilisateur.id == this.authService.getUser().id) {
          this.authService.setUser(this.utilisateur);
        }

        this.userService.modifyUser(this.utilisateur.id, this.utilisateur).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
        });

      } else {


        const formData: UserRegistration = {
          firstName: this.utilisateur.first_name,
          lastName: this.utilisateur.last_name,
          email: this.utilisateur.email,
          password: this.utilisateur.password,
          service: this.utilisateur.service_id,
          role: this.utilisateur.role as UserRole
        };

        console.log(this.utilisateur)

        this.utilisateurs.push(this.utilisateur);
        this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Créer', life: 3000 });
        this.authService.register(formData).subscribe(response => {
        }
        );

      }

      this.utilisateurs = [...this.utilisateurs];
      this.utilisateurDialog = false;
      this.createUser = false;
      this.utilisateur = new UserModel();
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

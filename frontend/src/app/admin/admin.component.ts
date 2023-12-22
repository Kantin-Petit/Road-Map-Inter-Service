import { Component, OnInit, ViewChild  } from '@angular/core';
import { User } from '../models/user-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { Table } from 'primeng/table';
import { ServiceService } from '../services/service.service'
import { ServiceList } from '../models/serviceList-model';

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
    Delete! : string;
    service!: ServiceList[];

    constructor(
      private userService: UserService, 
      private ServiceService: ServiceService,
      private messageService: MessageService, 
      private confirmationService: ConfirmationService) {}

    ngOnInit() {
      this.userService.getAllUser().subscribe(
        (data: User[]) => {
          this.utilisateurs = data; 
        },
        (error: any) => {
          console.error(error); 
        }
      );

      this.ServiceService.getAllService().subscribe(
        // (data: ServiceList[]) => {
        //   this.service = data; 
        //   console.log(data)
        // },
        // (error: string) => {
        //   console.error(error); 
        // }
      );

    }

    filterGlobal(event: Event) {
      console.log(event)
      const inputValue = (event.target as HTMLInputElement).value;
      this.dt.filterGlobal(inputValue, 'contains');
    }

    openNew() {
      this.utilisateur = new User();
      this.submitted = false;
      this.utilisateurDialog = true;
    }

    deleteSelectedUsers() {
      console.log(this.selectedUsers)
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle m-2',
            accept: () => {
                this.utilisateurs = this.utilisateurs.filter((val) => !this.selectedUsers?.includes(val));
                this.selectedUsers = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur Supprimer', life: 3000 });
            }
        });
    }

    editUser(utilisateur: User) {
        console.log(utilisateur)
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
          this.utilisateurs = this.utilisateurs.filter((val) => val.id !== utilisateur.id);
          this.utilisateur = new User(); 
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur supprimé', life: 3000 });
          this.userService.deleteUser(utilisateur['id']).subscribe(
            (data: User[]) => {
              this.utilisateurs = data; 
            },
            (error: any) => {
              console.error(error); 
            }
          );
        }
      });
    }

    hideDialog() {
        this.utilisateurDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.utilisateur.last_name?.trim()) {
          if (this.utilisateur.id) {
            this.utilisateurs[this.findIndexById(String(this.utilisateur.id))] = this.utilisateur;
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
          } else {
            this.utilisateur.id = Number(this.createId());
            this.utilisateurs.push(this.utilisateur);
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Créer', life: 3000 });
          }

          this.utilisateurs = [...this.utilisateurs];
          this.utilisateurDialog = false;
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

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}



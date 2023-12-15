import { Component, OnInit, ViewChild  } from '@angular/core';
import { User } from '../models/user-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { Table } from 'primeng/table';
import { Department } from '../models/department-model';
import { DepartmentService } from '../services/department.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService, ConfirmationService]

})

export class AdminComponent implements OnInit {

    @ViewChild('dt') dt!: Table;

    products!: User[];
    product!: User;
    productDialog: boolean = false;
    selectedProducts!: User[] | null;
    submitted: boolean = false;
    statuses!: any[];
    Delete! : string;
    service!: Department[];

    constructor(
      private userService: UserService, 
      private departmentService: DepartmentService,
      private messageService: MessageService, 
      private confirmationService: ConfirmationService) {}

    ngOnInit() {
      this.userService.getAllUser().subscribe(
        (data: User[]) => {
          this.products = data; 
        },
        (error: any) => {
          console.error(error); 
        }
      );

      this.departmentService.allService().subscribe(
        (data: Department[]) => {
          this.service = data; 
          console.log(data)
        },
        (error: Department) => {
          console.error(error); 
        }
      );

      

    }

    filterGlobal(event: Event) {
      console.log(event)
      const inputValue = (event.target as HTMLInputElement).value;
      this.dt.filterGlobal(inputValue, 'contains');
    }

    openNew() {
      this.product = new User();
      this.submitted = false;
      this.productDialog = true;
    }

    deleteSelectedProducts() {
      console.log(this.selectedProducts)
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle m-2',
            accept: () => {
                this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur Supprimer', life: 3000 });
            }
        });
    }

    editProduct(product: User) {
        console.log(product)
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: User) {
      console.log(product['id'])
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer ' + product.last_name + '?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle m-2',
        accept: () => {
          this.products = this.products.filter((val) => val.id !== product.id);
          this.product = new User(); 
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur supprimé', life: 3000 });
          this.userService.deleteUser(product['id']).subscribe(
            (data: User[]) => {
              this.products = data; 
            },
            (error: any) => {
              console.error(error); 
            }
          );
        }
      });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.last_name?.trim()) {
          if (this.product.id) {
            this.products[this.findIndexById(String(this.product.id))] = this.product;
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Modifier', life: 3000 });
          } else {
            this.product.id = Number(this.createId());
            this.products.push(this.product);
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Utilisateur Créer', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = new User(); 
        }
    }

    findIndexById(id: string): number {
      let index = -1;
      const numericId = Number(id); 
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === numericId) { 
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



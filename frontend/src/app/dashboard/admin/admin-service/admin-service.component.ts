import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceService } from '../../../services/service.service'
import { ServiceModel } from '../../../models/service-model';
import { of, map } from 'rxjs';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss']
})
export class AdminServiceComponent implements OnInit {


  @ViewChild('dt') dt!: Table;

  services!: ServiceModel[];
  service!: ServiceModel;
  serviceDialog: boolean = false;
  selectedServices!: ServiceModel[] | null;
  submitted: boolean = false;
  Delete!: string;
  createThematic: boolean = false


  constructor(
    private serviceService: ServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.serviceService.getAllService().subscribe(response => {
      this.services = response;
    });
  }

  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, 'contains');
  }

  openNew() {
    this.createThematic = true;
    this.service = new ServiceModel();
    this.submitted = false;
    this.serviceDialog = true;
  }

  onDialogHide() {
    if (!this.serviceDialog) this.createThematic = false;
  }

  deleteSelectedServices() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        if (!this.selectedServices) return
        this.selectedServices.forEach(service => {
          this.serviceService.deleteservice(service['id']).subscribe();
        });

        this.services = this.services.filter((val) => !this.selectedServices?.includes(val));
        this.selectedServices = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Supprimer', life: 3000 });

      }
    });
  }

  editService(service: ServiceModel) {
    this.service = { ...service };
    this.serviceDialog = true;
  }

  deleteService(thematic: ServiceModel) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + thematic.name + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        this.serviceService.deleteservice(thematic['id']).subscribe(() => {
          this.services = this.services.filter((val) => val.id !== thematic['id']);
          this.service = new ServiceModel();
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Service supprimé', life: 3000 });
        },
        );
      }
    });
  }

  hideDialog() {
    this.serviceDialog = false;
    this.createThematic = false;
    this.submitted = false;
  }


  saveService() {
    this.submitted = true;

    if (this.service.name?.trim()) {

      if (this.service.id) {
        this.services[this.findIndexById(String(this.service.id))] = this.service;
        this.serviceService.updateservice(this.service.id, this.service).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Service Modifier', life: 3000 });
        });
      } else {

        const formData: ServiceModel = {
          id: this.service.id,
          name: this.service.name,
          image: this.service.image,
          description: this.service.description,
        };

        this.services.push(this.service);
        this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Service Créer', life: 3000 });
        this.serviceService.createservice(formData).subscribe(response => {
          console.log(response);
        });

      }

      this.services = [...this.services];
      this.serviceDialog = false;
      this.createThematic = false;
      this.service = new ServiceModel();
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    const numericId = Number(id);
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id === numericId) {
        index = i;
        break;
      }
    }

    return index;
  }

}

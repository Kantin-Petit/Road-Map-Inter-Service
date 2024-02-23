import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceService } from '../../../services/service.service'
import { ServiceModel } from '../../../models/service-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss']
})
export class AdminServiceComponent implements OnInit {


  @ViewChild('dt') dt!: Table;
  @ViewChild('fileInput') fileInput: any;

  services!: ServiceModel[];
  service!: ServiceModel;
  serviceDialog: boolean = false;
  selectedServices!: ServiceModel[] | null;
  submitted: boolean = false;
  Delete!: string;
  createService: boolean = false
  socketUrl: string = environment.socketUrl;
  imageUrl: any = null;
  imageFile: any = null;

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
    this.createService = true;
    this.service = new ServiceModel();
    this.submitted = false;
    this.serviceDialog = true;
  }

  onDialogHide() {
    if (!this.serviceDialog) this.createService = false;
  }

  deleteSelectedServices() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les services sélectionnés ? Attention, cette action est irréversible et entraînera la suppression des Timelines ainsi que des utilisateurs associés.',
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
      message: 'Êtes-vous sûr de vouloir supprimer ' + thematic.name + '? Attention, cette action est irréversible et entraînera la suppression des Timelines ainsi que des utilisateurs associés.',
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
    this.createService = false;
    this.submitted = false;
    this.imageUrl = null;
    this.imageFile = null;
  }


  onFileSelected(event: any) {
    console.log(event.target.files[0]);
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  resetImage() {
    this.imageUrl = null;
    this.imageFile = null;
    this.fileInput.nativeElement.value = '';
  }

  saveService() {
    this.submitted = true;

    if (this.service.name?.trim()) {

      if (this.service.id) {

        const formDataWithImage = new FormData();
        formDataWithImage.append('id', String(this.service.id));
        formDataWithImage.append('name', this.service.name);
        formDataWithImage.append('description', this.service.description);
        formDataWithImage.append('type', 'service');
        formDataWithImage.append('image', this.imageFile, this.imageFile.name);

        const DATA = this.imageFile ? formDataWithImage : this.service;

        const index = this.findIndexById(String(this.service.id));
        this.serviceService.updateservice(this.service.id, DATA).subscribe(reponse => {
          this.services[index] = this.service;
          this.services[index].image = reponse.image;
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Service Modifié', life: 3000 });
          this.services = [...this.services];
          this.service = new ServiceModel();
        });
      } else {

        const formData: ServiceModel = {
          id: this.service.id,
          name: this.service.name,
          image: this.service.image,
          description: this.service.description,
        };

        this.serviceService.createservice(formData).subscribe(response => {
          this.services.push(this.service);
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Service Créer', life: 3000 });
          this.services = [...this.services];
          this.service = new ServiceModel();
        });

      }

      this.serviceDialog = false;
      this.createService = false;
      this.imageUrl = null;
      this.imageFile = null;
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

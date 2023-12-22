import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {


  constructor(private serviceService: ServiceService) { }

  services!: Observable<{ [key: string]: Service }>;
  serviceName!: string[];
  service!: Observable<{ [key: string]: Service }>;


  sidebarVisible: boolean = false;
  sidebarData: { title: string, text: string } = { title: '', text: '' };
  selectedItemIndex!: number |  null;
  
  ngOnInit() {
    this.getServices();
    this.getService();
    this.getServiceName();
  }

  toggleSidebar(index: number, titre: string, texte: string): void {
    if (!this.sidebarVisible || this.selectedItemIndex !== index) {
      this.selectedItemIndex = index;
      this.sidebarData = { title: titre, text: texte };
      this.sidebarVisible = true;
    } else {
      this.selectedItemIndex = null;
      this.sidebarData = { title: '', text: '' };
      this.sidebarVisible = false;
    }
  }

  isSingleText(texte: string): boolean {
    return Array.isArray(texte);
  }

  getServices() {
    this.services = this.serviceService.getAllService();
  }

  getService() {
    this.service = this.serviceService.getService('poste');
  }

  getServiceName() {
    this.serviceService.getAllServiceName().subscribe(
      (data: any) => {
        this.serviceName = data.files; 
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des noms de services :', error);
      }
    );
  }

}
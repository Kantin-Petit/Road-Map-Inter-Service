import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service-model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit{


  constructor(private serviceService: ServiceService) { }

  services!: Observable<{ [key: string]: Service }>;

  sidebarVisible: boolean = false;
  sidebarData: { title: string, text: string } = { title: '', text: '' };
  
  ngOnInit() {
    this.getServices();
  }


  openSidebar(title: string, text: string) {
    this.sidebarData = { title, text };
  }

  getServices() {
    this.services = this.serviceService.getAllService();
  }

    
}
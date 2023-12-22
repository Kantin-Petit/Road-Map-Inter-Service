import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit {


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
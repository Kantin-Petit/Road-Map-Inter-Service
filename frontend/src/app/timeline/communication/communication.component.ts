import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Service } from 'src/app/models/service-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  constructor(private serviceService: ServiceService) { }

  services: { [key: string]: Service } = {};
  servicesFiltered: { [key: string]: Service } = {};
  selectedOptions: { [key: string]: string } = {};

  servicesName: string[] = [];
  checkedServices: { [key: string]: boolean } = {};

  sidebarVisible: boolean = false;
  sidebarData: { title: string, text: string } = { title: '', text: '' };
  selectedItemIndex!: number | null;
  
  ngOnInit() {
    this.serviceService.getAllServiceName().subscribe(name => {
      this.servicesName = name;
      this.servicesName.forEach(service => {
        this.checkedServices[service] = true;
        this.selectedOptions[service] = 'all';
      });
    })
    this.serviceService.getAllService().subscribe(service => {
      this.services = service;
      Object.keys(service).forEach(key => {
        this.servicesFiltered[key] = JSON.parse(JSON.stringify(service[key]));
      });
    });
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

  selectedForService(service :any): string {
    return service.key;
  }

  onSelectOption(service: string, option: string) {
    if (!this.services[service]) return;

    const originalData = JSON.parse(JSON.stringify(this.services[service]));
  
    if (option === 'all') {
      this.servicesFiltered[service] = originalData;
    } else {
      const filteredTimelines = originalData.timelines.filter((timeline: { sujet: string }) => timeline.sujet === option);
      this.servicesFiltered[service] = { ...originalData, timelines: filteredTimelines };
    }
  
    this.selectedOptions[service] = option;
  }

  isSingleText(texte: string): boolean {
    return Array.isArray(texte);
  }

}

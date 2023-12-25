import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { SubjectService } from '../../services/subject.service';
import { Service } from '../../models/service-model';
import { Subject } from '../../models/subject-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private subjectService: SubjectService) { }

  services: { [key: string]: Service } = {};
  servicesFiltered: { [key: string]: Service } = {};
  subjects: { [key: string]: Subject } = {};

  servicesName: string[] = [];
  showAllServices!: boolean;

  checkedServices: { [key: string]: boolean } = {};
  selectedSubjects: { [key: string]: string } = {};

  sidebarVisible: boolean = false;
  sidebarData: { title: string, text: string } = { title: '', text: '' };
  selectedItemIndex!: number | null;
  
  ngOnInit() {
    this.setServices();
    this.setSubjects();
    this.isAllServicesAreChecked();
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.services = service;
      Object.keys(service).forEach(key => {
        this.servicesFiltered[key] = JSON.parse(JSON.stringify(service[key]));
        this.checkedServices[key] = false;
        this.selectedSubjects[key] = 'all';
        this.servicesName.push(key);
      });
    });
  }

  setSubjects() {
    this.subjectService.getAllsubject().subscribe(sujets => {
      this.subjects = sujets;
    });
  }

  isAllServicesAreChecked() {
    const allFalse = Object.values(this.checkedServices).every(value => value === false);
    allFalse ? this.showAllServices = true : this.showAllServices = false;
  }

  onCheckboxChange() {
    this.isAllServicesAreChecked()
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

  onSelectSubjects(service: string, sujet: string) {
    if (!this.services[service]) return;

    const originalData = JSON.parse(JSON.stringify(this.services[service]));
  
    if (sujet === 'all') {
      this.servicesFiltered[service] = originalData;
    } else {
      const filteredTimelines = originalData.timelines.filter((timeline: { sujet: string }) => timeline.sujet === sujet);
      this.servicesFiltered[service] = { ...originalData, timelines: filteredTimelines };
    }
  
    this.selectedSubjects[service] = sujet;
  }

  isSingleText(texte: string): boolean {
    return Array.isArray(texte);
  }

}

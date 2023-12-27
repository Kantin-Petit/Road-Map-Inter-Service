import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { SubjectService } from '../../services/subject.service';
import { Service } from '../../models/service-model';
import { Subject } from '../../models/subject-model';

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
  servicesFilter: { [key: string]: Service } = {};
  subjects: { [key: string]: Subject } = {};

  checkedServices: { [key: string]: boolean } = {};
  checkedServicesInit : { [key: string]: boolean } = {};
  checkedSubjects: { [key: string]: { [innerKey: string]: boolean } } = {};

  sidebarVisible: boolean = false;
  sidebarData: { title: string, text: string } = { title: '', text: '' };
  selectedItemIndex!: string | null;
  
  ngOnInit() {
    this.setServices();
    this.setSubjects();
  }

  getColorForSubject(subjectName: string): string {
    const foundSubject = this.subjects[subjectName];
    return foundSubject ? foundSubject.color : '#000000';
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.services = service;
      this.servicesFilter = {...service};
      Object.keys(this.servicesFilter).forEach(key => this.checkedServicesInit[key] = true);
    });
  }

  setSubjects() {
    this.subjectService.getAllsubject().subscribe(sujets => {
      this.subjects = sujets;
    });
  }

  isAllChecked() {

    let activeService;
    const allFalse = Object.values(this.checkedServices).every(value => value === false);
    allFalse ? activeService = this.checkedServicesInit : activeService = this.checkedServices;

    const allCheckbox = {
      services: activeService,
      sujets: this.checkedSubjects,
    };

    this.serviceService.getfilteredService(allCheckbox).subscribe(updatedServices => {
      this.services = {...updatedServices}
    });

  }

  toggleSidebar(index: number, service: string, titre: string, texte: string): void {
    if (!this.sidebarVisible || this.selectedItemIndex !== service[index]) {
      this.selectedItemIndex = service[index];
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

  isChecked(serviceKey: string, sujet: string): boolean {
    if (!this.checkedSubjects[serviceKey]) return false;
    return !!this.checkedSubjects[serviceKey][sujet];
  }

  getActiveSubjects(key: string): string[] {
    const trueInnerKeys: string[] = [];
  
    if (this.checkedSubjects.hasOwnProperty(key)) {
      const innerKeys = this.checkedSubjects[key];
      for (const innerKey in innerKeys) {
        if (innerKeys.hasOwnProperty(innerKey) && innerKeys[innerKey] === true) { trueInnerKeys.push(innerKey);}
      }
    }
  
    return trueInnerKeys;
  }

  onSelectSubjects(service: string, isChecked: boolean, sujet: string) {

    if (!this.checkedSubjects[service]) this.checkedSubjects[service] = {};
    this.checkedSubjects[service][sujet] = isChecked;

    const sujets = this.getActiveSubjects(service);
    this.serviceService.getService(service, sujets).subscribe(updatedService => {
      if (this.services[service]) {
        this.services[service].timelines = [...updatedService[service].timelines];
      }
    });
  }

  isSingleText(texte: string): boolean {
    return Array.isArray(texte);
  }

}

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

  showAllServices!: boolean;

  checkedServices: { [key: string]: boolean } = {};
  checkedSubjects: { [key: string]: { [innerKey: string]: boolean } } = {};

  sidebarVisible: boolean = false;
  sidebarData: { title: string, text: string } = { title: '', text: '' };
  selectedItemIndex!: string | null;
  
  ngOnInit() {
    this.setServices();
    this.setSubjects();
    this.isAllChecked();
  }

  getColorForSubject(subjectName: string): string {
    const foundSubject = this.subjects[subjectName];
    return foundSubject ? foundSubject.color : '#000000';
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.services = service;
      Object.keys(service).forEach(key => {
        this.servicesFiltered[key] = JSON.parse(JSON.stringify(service[key]));
      });
    });
  }

  setSubjects() {
    this.subjectService.getAllsubject().subscribe(sujets => {
      this.subjects = sujets;
    });
  }

  isAllChecked() {
    const allFalse = Object.values(this.checkedServices).every(value => value === false);
    allFalse ? this.showAllServices = true : this.showAllServices = false;
  }

  toggleSidebar(index: number, service: string, titre: string, texte: string): void {
    if (!this.sidebarVisible || this.selectedItemIndex !== service[index]) {
      this.selectedItemIndex = service[index];
      console.log(typeof(service[index]))
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

  onSelectSubjects(service: string, isChecked: boolean, sujet: string) {

    if (!this.checkedSubjects[service]) this.checkedSubjects[service] = {};
    this.checkedSubjects[service][sujet] = isChecked;

    const originalData = JSON.parse(JSON.stringify(this.services[service]));
    const sujetsArray = this.getInnerKeyNames(service);
  
    if (sujetsArray.length === 0) {
      this.servicesFiltered[service] = originalData;
    } else {
      const filteredTimelines = originalData.timelines.filter((timeline: { sujet: string }) => sujetsArray.includes(timeline.sujet));
      this.servicesFiltered[service] = { ...originalData, timelines: filteredTimelines };
    }
  
  }

  getInnerKeyNames(keyName: string): string[] {

    let innerKeyValues: string[] = [];

    if (this.checkedSubjects[keyName]) {

      const innerKeys = Object.keys(this.checkedSubjects[keyName]);
      innerKeys.forEach(innerKey => {
        if(this.checkedSubjects[keyName][innerKey] === true) innerKeyValues.push(innerKey);
      });
    }
  
    return innerKeyValues;
  }

  isSingleText(texte: string): boolean {
    return Array.isArray(texte);
  }

}

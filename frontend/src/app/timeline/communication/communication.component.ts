import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { SubjectService } from '../../services/subject.service';
import { ServiceModel, TimelineModel } from '../../models/service-model';
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

  services: { [key: string]: ServiceModel } = {};
  servicesFilter: { [key: string]: ServiceModel } = {};
  subjects: { [key: string]: Subject } = {};

  checkedServices: { [key: string]: boolean } = {};
  checkedServicesInit : { [key: string]: boolean } = {};
  checkedSubjects: { [key: string]: { [innerKey: string]: boolean } } = {};

  sidebarVisible: boolean = false;
  sidebarData!: TimelineModel;
  selectedItemIndex!: string | null;

  isCollapsed: boolean = false;
  isOpen: { [key: string]: boolean } = {};

  
  ngOnInit() {
    const elH = document.querySelectorAll(".timeline li > div");
    this.setServices();
    this.setSubjects();
    this.setEqualHeights(elH);
  }


  getColorForSubject(subjectName: string): string {
    const foundSubject = this.subjects[subjectName];
    return foundSubject ? foundSubject.color : '#000000';
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.services = service;
      this.servicesFilter = {...service};
      Object.keys(this.servicesFilter).forEach(key => {
        this.checkedServicesInit[key] = true
        this.checkedSubjects[key] = {};
      });
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

  toggleSidebar(index: number, service: string, timelineData: TimelineModel): void {
    if (!this.sidebarVisible || this.selectedItemIndex !== service[index]) {
      this.selectedItemIndex = service[index];
      this.sidebarData = timelineData;
      this.sidebarVisible = true;
    } else {
      this.selectedItemIndex = null;
      this.sidebarVisible = false;
      this.sidebarData = new TimelineModel();
    }
  }

  selectedForService(service :any): string {
    return service.key;
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
      if (this.services[service]) this.services[service].timelines = [...updatedService[service].timelines];
    });
  }

  setEqualHeights(el :any) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      const singleHeight = el[i].offsetHeight;
  
      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }
  
    for (let i = 0; i < el.length; i++) {
      el[i].style.height = `${counter}px`;
    }
  }


  toggleSidebarMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubMenu(serviceKey: string) {
    this.isOpen[serviceKey] = !this.isOpen[serviceKey];
  }

}

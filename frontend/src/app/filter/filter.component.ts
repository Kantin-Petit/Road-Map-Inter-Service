import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { SubjectService } from '../services/subject.service';
import { TimelineModel } from '../models/service-model';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    public serviceService: ServiceService,
    public subjectService: SubjectService,
    public filterService: FilterService) { }


  ngOnInit() {
    const elH = document.querySelectorAll(".timeline li > div");
    this.setServices();
    this.setSubjects();
    this.setEqualHeights(elH);
  }

  getColorForSubject(subjectName: string): string {
    const foundSubject = this.filterService.subjects[subjectName];
    return foundSubject ? foundSubject.color : '#000000';
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.filterService.services = { ...service };
      this.filterService.servicesFilter = { ...service };
      Object.keys(this.filterService.servicesFilter).forEach(key => {
        this.filterService.checkedServicesInit[key] = true;
        this.filterService.checkedSubjects[key] = {};
      });
      this.filterService.setServicesFilter(true);
    });
  }

  setSubjects() {
    this.subjectService.getAllsubject().subscribe(sujets => {
      this.filterService.subjects = { ...sujets };
      this.filterService.setServicesFilter(true);
    });
  }

  isAllChecked() {

    let activeService;
    const allFalse = Object.values(this.filterService.checkedServices).every(value => value === false);
    allFalse ? activeService = this.filterService.checkedServicesInit : activeService = this.filterService.checkedServices;

    const allCheckbox = {
      services: activeService,
      sujets: this.filterService.checkedSubjects,
    };

    this.serviceService.getfilteredService(allCheckbox).subscribe(updatedServices => {
      this.filterService.services = { ...updatedServices };
      this.filterService.setServicesFilter(true);
    });

  }

  toggleSidebar(index: number, service: string, timelineData: TimelineModel): void {
    if (!this.filterService.sidebarVisible || this.filterService.selectedItemIndex !== service[index]) {
      this.filterService.selectedItemIndex = service[index];
      this.filterService.sidebarData = timelineData;
      this.filterService.sidebarVisible = true;
    } else {
      this.filterService.selectedItemIndex = null;
      this.filterService.sidebarVisible = false;
      this.filterService.sidebarData = new TimelineModel();
    }
  }

  selectedForService(service: any): string {
    return service.key;
  }

  getActiveSubjects(key: string): string[] {
    const trueInnerKeys: string[] = [];

    if (this.filterService.checkedSubjects.hasOwnProperty(key)) {
      const innerKeys = this.filterService.checkedSubjects[key];
      for (const innerKey in innerKeys) {
        if (innerKeys.hasOwnProperty(innerKey) && innerKeys[innerKey] === true) { trueInnerKeys.push(innerKey); }
      }
    }

    return trueInnerKeys;
  }

  onSelectSubjects(service: string, isChecked: boolean, sujet: string) {

    if (!this.filterService.checkedSubjects[service]) this.filterService.checkedSubjects[service] = {};
    this.filterService.checkedSubjects[service][sujet] = isChecked;

    const sujets = this.getActiveSubjects(service);
    this.serviceService.getService(service, sujets).subscribe(updatedService => {
      if (this.filterService.services[service]) this.filterService.services[service].timelines = [...updatedService[service].timelines];
      this.filterService.setServicesFilter(true);

    });

  }

  setEqualHeights(el: any) {
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
    this.filterService.isCollapsed = !this.filterService.isCollapsed;
  }

  toggleSubMenu(serviceKey: string) {
    this.filterService.isOpen[serviceKey] = !this.filterService.isOpen[serviceKey];
  }

}

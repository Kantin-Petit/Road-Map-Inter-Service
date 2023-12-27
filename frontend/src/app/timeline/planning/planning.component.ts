import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Service } from 'src/app/models/service-model';
import { Subject } from '../../models/subject-model';
import { ServiceService } from 'src/app/services/service.service';
import { SubjectService } from '../../services/subject.service';
import { DataSet, Timeline } from "vis-timeline/standalone";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})

export class PlanningComponent implements OnInit, AfterViewInit {

  timeline!: Timeline;
  options!: {};
  data: any;
  groups: any;

  services: { [key: string]: Service } = {};
  servicesFilter: { [key: string]: Service } = {};
  subjects: { [key: string]: Subject } = {};

  checkedServices: { [key: string]: boolean } = {};
  checkedServicesInit : { [key: string]: boolean } = {};
  checkedSubjects: { [key: string]: { [innerKey: string]: boolean } } = {};

  @ViewChild('timeline', {static: false}) timelineContainer!: ElementRef;

  constructor(
    private serviceService: ServiceService,
    private subjectService: SubjectService) {
    this.data = new DataSet();
    this.groups = new DataSet();
  }

  ngOnInit() {
    this.setServices();
    this.setSubjects();
    this.getOptions();
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.services = service;
      this.servicesFilter = {...service};
      this.addDataIntoDom()
      Object.keys(this.servicesFilter).forEach(key => this.checkedServicesInit[key] = true);
    });
  }

  addDataIntoDom() {
    const keys = Object.keys(this.services);
    let compteur = 1;
    for (let i = 0; i < keys.length; i++) {
      this.groups.add({id: i, content: keys[i]});
      for (let j = 0; j < this.services[keys[i]].timelines.length; j++) {
        this.data.add({id: compteur, content: this.services[keys[i]].timelines[j].titre, start: this.services[keys[i]].timelines[j].dateStart, end: this.services[keys[i]].timelines[j].dateEnd, group: i});
        compteur++;
      }
    } 
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
      this.updateTimeline();
    });

  }

  updateTimeline() {
    this.groups.clear();
    this.data.clear();
    this.addDataIntoDom()
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
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
        this.updateTimeline();
      }
    });
  }

  ngAfterViewInit() {
    this.timeline = new Timeline(this.timelineContainer.nativeElement, this.data, this.groups, this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
    this.timeline.on('select', function (properties) {
      alert('selected items: ' + properties.items);
    });
  }

  getOptions() {
    this.options = {
      selectable: false,
      locale: 'fr',
      // template: function (item: any, element: any, data: any) {
      //   var html = '<h1>' + item.content + '</h1>';
      //   return html;
      // },
      
    };
  }
}

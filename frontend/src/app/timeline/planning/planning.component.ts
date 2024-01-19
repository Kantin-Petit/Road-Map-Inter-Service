import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener  } from '@angular/core';
import { ServiceModel, TimelineModel } from 'src/app/models/service-model';
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

  services: { [key: string]: ServiceModel } = {};
  servicesFilter: { [key: string]: ServiceModel } = {};
  subjects: { [key: string]: Subject } = {};

  checkedServices: { [key: string]: boolean } = {};
  checkedServicesInit : { [key: string]: boolean } = {};
  checkedSubjects: { [key: string]: { [innerKey: string]: boolean } } = {};

  sidebarVisible: boolean = false;
  sidebarData!: TimelineModel;
  selectTimeline!: string;

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
      Object.keys(this.servicesFilter).forEach(key => {
        this.checkedServicesInit[key] = true
        this.checkedSubjects[key] = {};
      });
    });
  }

  addDataIntoDom() {
    const servicesKeys = Object.keys(this.services);
  
    servicesKeys.forEach((serviceKey, serviceIndex) => {
      const timelines = this.services[serviceKey].timelines;
  
      this.groups.add({
        id: serviceIndex,
        content: this.services[serviceKey].name,
        className: "custom_group",
      });
  
      timelines.forEach((timeline, timelineIndex) => {
        const {
          dateStart,
          dateEnd,
          sujet
        } = timeline;
  
        const timelineId = `service${serviceIndex}_timeline${timelineIndex}`;
        const itemClassName = `custom_item ${sujet} ${timelineId}`;
  
        this.data.add({
          id: timelineId,
          content: timeline,
          start: dateStart,
          end: dateEnd,
          className: itemClassName,
          group: serviceIndex,
        });
      });
    });
  }  

  setSubjects() {
    this.subjectService.getAllsubject().subscribe(sujets => {
      
      this.subjects = sujets;

      const classes: string[] = Object.keys(this.subjects);
      let cssStyles = '';

      classes.forEach((className) => {
          var color = this.getColorForSubject(className);
          cssStyles += `.${className} { background-color: ${color}; }\n`;
      });

      let styleTag = document.createElement('style');
      styleTag.textContent = cssStyles;
      document.head.appendChild(styleTag);
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
    this.timeline.on('click',  (properties) => {
      if(!properties.event.target.parentNode['vis-item']?.data.content) return
      const content = properties.event.target.parentNode['vis-item'];
      this.toggleSidebar(content)
    });
  }

  toggleSidebar(elt: any): void {

    this.sidebarData = new TimelineModel();
    this.selectTimeline = '';

    if (!this.sidebarVisible) {
      this.sidebarData = elt.data.content;
      this.sidebarVisible = true;
      this.selectTimeline = elt.id
      this.toogleActive()
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(this.selectTimeline && !this.sidebarVisible) document.querySelector(`.${this.selectTimeline}`)?.classList.remove("active");
  }

  toogleActive(){
    const timeline = document.querySelector(`.${this.selectTimeline}`)
    if(timeline) timeline.classList.add("active");
  }

  getColorForSubject(subjectName: string): string {
    const foundSubject = this.subjects[subjectName];
    return foundSubject ? foundSubject.color : '#000000';
  }

  getOptions() {

    this.options = {
      selectable: false,
      locale: 'fr',
      template: function (item: any, element: any, data: any) {},
    };

  }

 
}

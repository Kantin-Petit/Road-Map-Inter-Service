import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service-model';
import { ServiceService } from 'src/app/services/service.service';
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
  services!: Observable<{ [key: string]: Service }>;

  @ViewChild('timeline', {static: false}) timelineContainer!: ElementRef;

  constructor(private serviceService: ServiceService) {
    this.data = new DataSet();
    this.groups = new DataSet();
  }

  ngOnInit() {
    // Initialisation indépendante de ViewChild
    this.getServices();
    this.services.subscribe((data) => {
      const keys = Object.keys(data);
      let compteur = 1;
      for (let i = 0; i < keys.length; i++) {
        this.groups.add({id: i, content: keys[i]});
        for (let j = 0; j < data[keys[i]].timelines.length; j++) {
          this.data.add({id: compteur, content: data[keys[i]].timelines[j].titre, start: data[keys[i]].timelines[j].dateStart, end: data[keys[i]].timelines[j].dateEnd, group: i});
          compteur++;
        }
      } 
    });
    this.getOptions();
  }

  getServices() {
    this.services = this.serviceService.getAllService();
  }

  ngAfterViewInit() {
    // Initialisation dépendante de ViewChild
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

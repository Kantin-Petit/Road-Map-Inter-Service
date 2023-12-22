import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

  @ViewChild('timeline', {static: false}) timelineContainer!: ElementRef;

  constructor() {
    this.data = new DataSet();
    this.groups = new DataSet();
    this.getTimelineData();
    this.getTimelineGroups();
    this.getOptions();
  }

  ngOnInit() {
    // Initialisation indépendante de ViewChild
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

  getTimelineGroups() {
    this.groups.add([
      {id: 1, content: 'Group 1'},
      {id: 2, content: 'Group 2'}
    ]);
  }

  getTimelineData() {
    this.data.add([
      {id: 3, content: 'Read-only', editable: false, start: '2010-08-24T16:00:00', group: 1},
      {id: 4, content: 'Read-only', editable: false, start: '2010-08-26', end: '2010-09-02', group: 2},
    ]);
  }
  

  getOptions() {
    this.options = {
      editable: true,
      locale: 'fr',
      // template: function (item: any, element: any, data: any) {
      //   var html = '<h1>' + item.content + '</h1>';
      //   return html;
      // },
      
    };
  }
}

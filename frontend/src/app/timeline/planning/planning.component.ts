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
      {id: 1, content: 'Editable', editable: true, start: '2010-08-23', group: 1, className: 'vis-test' },
      {id: 2, content: 'Editable', editable: true, start: '2010-08-23T23:00:00', group: 2},
      {id: 3, content: 'Read-only', editable: false, start: '2010-08-24T16:00:00', group: 1},
      {id: 4, content: 'Read-only', editable: false, start: '2010-08-26', end: '2010-09-02', group: 2},
      {id: 5, content: 'Edit Time Only', editable: { updateTime: true, updateGroup: false, remove: false }, start: '2010-08-28', group: 1},
      {id: 6, content: 'Edit Group Only', editable: { updateTime: false, updateGroup: true, remove: false }, start: '2010-08-29', group: 2},
      {id: 7, content: 'Remove Only', editable: { updateTime: false, updateGroup: false, remove: true }, start: '2010-08-31', end: '2010-09-03', group: 1},
      {id: 8, content: 'Default', start: '2010-09-04T12:00:00', group: 2},
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

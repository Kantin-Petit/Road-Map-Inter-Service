import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { TimelineModel } from 'src/app/models/timeline-model';
import { DataSet, Timeline } from "vis-timeline/standalone";
import { FilterService } from 'src/app/services/filter.service';
import vis from 'vis-network/declarations/index-legacy-bundle';
import { style } from '@angular/animations';

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
  
  @ViewChild('timeline', { static: false }) timelineContainer!: ElementRef;

  constructor(public filterService: FilterService) {
    this.data = new DataSet();
    this.groups = new DataSet();
  }

  ngOnInit() {
    this.addDataIntoDom()
    this.setThematics();
    this.getOptions();
    this.filterService.getFilterChangeObservable().subscribe(() => {
      this.updateTimeline();
      this.setThematics();
    });
  }

  addDataIntoDom() {
    var $r = 0;
    var $g = 0;
    var $b = 0;
    var $step = 50;
    this.filterService.services.forEach((service) => {
      const { id, name, sujets } = service;

      this.groups.add({
        id: id,
        content: name,
        className: "custom_group_"+service.id,
      });

      let cssStyles = `.custom_group_${service.id} .vis-item-overflow .vis-item-content { background-color: rgb(${$r}, ${$g}, ${$b}); color: rgb(${255-$r},${255-$g},${255-$b}) }\n`;
      cssStyles += `.custom_group_${service.id} .vis-item-overflow { background-color: rgb(${$r}, ${$g}, ${$b}, .7) }`;
      let styleTag = document.createElement('style');
      styleTag.textContent += cssStyles;
      document.head.appendChild(styleTag);

      $r += $step;
      $g += $step + 50;
      $b += $step + 100;

      sujets.forEach((timeline) => {
        const { id: timeeline_id, date_start: dateStart, date_end: dateEnd, Thematics } = timeline;

        const timelineId = `service${id}_timeline${timeeline_id}`;
        const itemClassName = `custom_item ${Thematics[0].name} ${timelineId}`;

        this.data.add({
          id: timelineId,
          content: timeline, 
          start: dateStart,
          end: dateEnd,
          className: itemClassName,
          group: id
        });
      });
    });

  }

  setThematics() {

      let cssStyles = '';

      this.filterService.thematics.forEach((thematic) => { 
          let color = '#ffffff';
          cssStyles += `.${thematic.name} { background-color: ${color}; }\n`;
      });

    let styleTag = document.createElement('style');
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

  }

  updateTimeline() {
    this.groups.clear();
    this.data.clear();
    this.addDataIntoDom()
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
  }

  ngAfterViewInit() {
    this.timeline = new Timeline(this.timelineContainer.nativeElement, this.data, this.groups, this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
    this.timeline.on('click', (properties) => {
      console.log(properties, "properties")
      if (!properties.event.target.parentNode['vis-item']?.data.content) return
      const content = properties.event.target.parentNode['vis-item'];
      console.log(content)
      this.toggleSidebar(content)
      
    });
  }

  toggleSidebar(elt: any): void {

    this.filterService.sidebarData = new TimelineModel();
    this.filterService.selectTimeline = '';

    if (!this.filterService.sidebarVisible) {
      this.filterService.sidebarData = elt.data.content;
      this.filterService.sidebarVisible = true;
      this.filterService.selectTimeline = elt.id
      this.toogleActive()
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInputElement = clickedElement.tagName.toLowerCase() === 'input';
    const isCheckbox = isInputElement && (clickedElement as HTMLInputElement).type.toLowerCase() === 'checkbox';
    if (isCheckbox) {
      this.updateTimeline()
    };
    if (this.filterService.selectTimeline && !this.filterService.sidebarVisible) document.querySelector(`.${this.filterService.selectTimeline}`)?.classList.remove("active");
  }

  toogleActive() {
    const timeline = document.querySelector(`.${this.filterService.selectTimeline}`)
    if (timeline) timeline.classList.add("active");
  }


  getOptions() {

    this.options = {
      selectable: false,
      locale: 'fr',
      template: function (item: any, element: any, data: any) { 
        return '<div>' + item.content.title + '</div>';
      },
      timeAxis: {
        scale: 'month',
      },
      horizontalScroll: true,
      orientation: 'top',
      zoomable: false,
      groupHeightMode: 'fixed',
      format: {
        majorLabels: {
          week: 'MMM',
        }
      },
    };

  }


}

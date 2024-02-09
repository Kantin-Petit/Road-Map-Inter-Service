import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { TimelineModel } from 'src/app/models/timeline-model';
import { DataSet, Timeline } from "vis-timeline/standalone";
import { FilterService } from 'src/app/services/filter.service';
import vis from 'vis-network/declarations/index-legacy-bundle';

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
    this.filterService.services.forEach((service) => {
      const { id, name, sujets } = service;

      this.groups.add({
        id: id,
        content: name,
        className: "custom_group",
      });

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

    this.setStyle();

  }

  setStyle() {
    let cssStyles = '';

    let custom_group = '.custom_group {';
    // custom_group += 'height: 100px !important;';
    custom_group += 'border: 1px solid #e5e5e5;';
    custom_group += ' }';

    let vis_label = '.vis-label {';
    vis_label += 'text-align: center;';
    vis_label += 'font-size: 1.3rem;';
    vis_label += 'font-weight: bold;';
    vis_label += ' }';

    let timeline_title = '.timeline-title {';
    timeline_title += 'margin: 0;';
    timeline_title += '}';

    let vis_content = '.vis-content { ';
    vis_content += 'top: 0 !important;';
    vis_content += 'transform: translateY(0) !important;';
    vis_content += '';
    vis_content += ' }';

    let vis_item_content = '.vis-item-content { ';
    vis_item_content += 'display: flex !important;';
    vis_item_content += 'justify-content: space-between;';
    vis_item_content += '}';

    //let thematic_div = '.thematics div { width: 10px; height: 10px; margin: 0 5px; }';

    cssStyles += custom_group + '\n' + vis_label + '\n'+ timeline_title + '\n' + vis_content + '\n' + vis_item_content + '\n'  + '\n';
    let styleTag = document.createElement('style');
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);
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
      if (!properties.event.target.parentNode['vis-item']?.data.content) return
      const content = properties.event.target.parentNode['vis-item'];
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
        return `
        <div class="vis-item-content">
          <div class="vis-label">${item.content.title}</div>
        </div>
        <style>
          .vis-item-content { display: flex; justify-content: space-between; }
        </style>`;
       },
    };

  }


}

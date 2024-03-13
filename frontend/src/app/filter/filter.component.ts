import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ThematicService } from '../services/thematic.service';
import { TimelineModel } from '../models/timeline-model';
import { FilterService } from '../services/filter.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private subscription: Subscription;

  constructor(
    public serviceService: ServiceService,
    public thematicService: ThematicService,
      public filterService: FilterService,
    public TimelineService: TimelineService,
    private router: Router) {

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        filterService.resetVariables();
      }
    });
  }

  getSubscription() {
    return this.subscription;
  }

  ngOnInit() {
    this.setServices();
    this.setThematics();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setServices() {
    this.TimelineService.getAllTimeline().subscribe(service => {
      console.log(service);
      this.filterService.services = service;
      this.filterService.servicesFilter = [...service];
      this.filterService.setServicesFilter(true);
    });
  }

  setThematics() {
      this.thematicService.getAllthematic().subscribe(thematics => {
      this.filterService.thematics = thematics;
      this.filterService.setServicesFilter(true);
    });
  }

  onCheckboxChange(event: any, id: number, thematic: boolean): void {

    let checkedArray;

    checkedArray = thematic ? this.filterService.checkedThematics : this.filterService.checkedServices;

    if (event.target.checked) {
      checkedArray.push(id);
    } else {
      const index = checkedArray.indexOf(id);
      if (index !== -1) {
        checkedArray.splice(index, 1);
      }
    }

    const data: { services: number[], thematic?: number[], hasThematic?: boolean } = {
      services: this.filterService.checkedServices,
    };

    if (thematic || this.filterService.checkedThematics.length > 0) {
      data.thematic = this.filterService.checkedThematics,
      data.hasThematic = true
    };


      this.TimelineService.getFilteredTimeline(data).subscribe(updatedServices => {
        this.filterService.services = updatedServices;
        if (thematic) {
          this.filterService.servicesFilter = [...updatedServices];
          this.filterService.checkedServices = [...this.filterService.checkedServicesInit];
        }
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

  toggleSidebarMenu() {
    this.filterService.isCollapsed = !this.filterService.isCollapsed;
  }

}

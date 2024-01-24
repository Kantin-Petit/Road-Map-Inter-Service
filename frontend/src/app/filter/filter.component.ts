import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ThematicService } from '../services/thematic.service';
import { TimelineModel } from '../models/service-model';
import { FilterService } from '../services/filter.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private subscription: Subscription;
  selectedThematic: string = 'Default';

  constructor(
    public serviceService: ServiceService,
    public thematicService: ThematicService,
    public filterService: FilterService,
    private router: Router) {

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        filterService.resetVariables();
      }
    });
  }


  ngOnInit() {
    const elH = document.querySelectorAll(".timeline li > div");
    this.setServices();
    this.setThematics();
    this.setEqualHeights(elH);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getColorForThematic(thematicName: string): string {
    const foundThematic = this.filterService.thematics[thematicName];
    return foundThematic ? foundThematic.color : '#000000';
  }

  setThematicFilter(value: string) {
    
    if (!(value === "Default")) {
      for(let service in this.filterService.servicesFilter) {
        for(let thematic in this.filterService.thematics) {
          this.onSelectThematics(service, false, thematic)
        }
        this.onSelectThematics(service, true, value)
      }
    }
    else {
      for(let service in this.filterService.servicesFilter) {
        for(let thematic in this.filterService.thematics) {
          this.onSelectThematics(service, false, thematic)
        }
      }
    }
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.filterService.services = { ...service };
      this.filterService.servicesFilter = { ...service };
      Object.keys(this.filterService.servicesFilter).forEach(key => {
        this.filterService.checkedServicesInit[key] = true;
        this.filterService.checkedThematics[key] = {};
      });
      this.filterService.setServicesFilter(true);
    });
  }

  setThematics() {
    this.thematicService.getAllthematic().subscribe(thematics => {
      this.filterService.thematics = { ...thematics };
      this.filterService.setServicesFilter(true);
    });
  }

  isAllChecked() {

    let activeService;
    const allFalse = Object.values(this.filterService.checkedServices).every(value => value === false);
    allFalse ? activeService = this.filterService.checkedServicesInit : activeService = this.filterService.checkedServices;

    const allCheckbox = {
      services: activeService,
      thematics: this.filterService.checkedThematics,
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

  getActiveThematics(key: string): string[] {
    const trueInnerKeys: string[] = [];

    if (this.filterService.checkedThematics.hasOwnProperty(key)) {
      const innerKeys = this.filterService.checkedThematics[key];
      for (const innerKey in innerKeys) {
        if (innerKeys.hasOwnProperty(innerKey) && innerKeys[innerKey] === true) { trueInnerKeys.push(innerKey); }
      }
    }

    return trueInnerKeys;
  }

  onSelectThematics(service: string, isChecked: boolean, thematic: string) {

    if (!this.filterService.checkedThematics[service]) this.filterService.checkedThematics[service] = {};
    this.filterService.checkedThematics[service][thematic] = isChecked;

    const thematics = this.getActiveThematics(service);
    this.serviceService.getService(service, thematics).subscribe(updatedService => {
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

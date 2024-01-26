import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ThematicService } from '../services/thematic.service';
import { ServiceModel, TimelineModel } from '../models/service-model';
import { FilterService } from '../services/filter.service';
import { Subscription, map } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Thematic } from '../models/thematic-model';

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
    this.filterService.checkedServices = this.filterService.checkedServicesInit;

    const res = Object.entries(this.filterService.servicesFilter).map((service: [string, ServiceModel]) => {
      console.log(service[1].thematics);
      console.log(service[1].thematics.includes(value));
      if(service[1].thematics.includes(value))
      {
        this.filterService.checkedServices[service[0]] = true;
      } 
      else
      { 
        this.filterService.checkedServices[service[0]] = false;
      }
    });
    console.log(this.filterService.checkedServices); 
    
    

    this.isAllChecked();
  }

  setServices() {
    this.serviceService.getAllService().subscribe(service => {
      this.filterService.services = { ...service };
      this.filterService.servicesFilter = { ...service };
      this.filterService.setServicesFilter(true);
    });
  }

  setThematics() {
    this.thematicService.getAllthematic().subscribe(thematics => {
      this.filterService.thematics = { ...thematics };
      this.filterService.thematicsFilter = { ...thematics };
      Object.keys(this.filterService.thematicsFilter).forEach(key => {
        this.filterService.checkedThematicsInit[key] = {};
        this.filterService.checkedThematicsInit[key][key] = true;
      });
      this.filterService.setServicesFilter(true);
    });
  }

  isAllChecked() {

    let activeThematics;
    const allFalseThematics = Object.values(this.filterService.checkedThematics).every(key => Object.values(key).every(innerValue => innerValue === false));
    allFalseThematics ? activeThematics = this.filterService.checkedThematicsInit : activeThematics = this.filterService.checkedThematics;

    let activeService;
    const allFalse = Object.values(this.filterService.checkedServices).every(value => value === false);
    allFalse && !allFalseThematics ? activeService = this.filterService.checkedServicesInit : activeService = this.filterService.checkedServices;

    const allCheckbox = {
      services: activeService,
      thematics: activeThematics
    };

    this.serviceService.getfilteredService(allCheckbox).subscribe(updatedServices => {
      console.log(updatedServices);
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

}

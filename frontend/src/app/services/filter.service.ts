import { Injectable } from '@angular/core';
import { ServiceModel } from '../models/service-model';
import { TimelineModel, TimelineModelWithService } from '../models/timeline-model';
import { ThematicModel } from '../models/thematic-model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  services!: TimelineModelWithService[];
  servicesFilter!: TimelineModelWithService[];
  thematics!: ThematicModel[];

  checkedServices: number[] = [];
  checkedServicesInit: number[] = [];
  checkedThematics: number[] = [];

  sidebarVisible: boolean = false;
  sidebarData!: TimelineModel;
  selectedItemIndex!: string | null;
  selectTimeline!: string;

  isCollapsed: boolean = false;
  isOpen: { [key: string]: boolean } = {};

  isFullLoad: boolean = false;

  private filterChangeThematic: Subject<void> = new Subject<void>();

  getFilterChangeObservable(): Observable<void> {
    return this.filterChangeThematic.asObservable();
  }

  setServicesFilter(status: boolean): void {
    this.isFullLoad = status;
    this.filterChangeThematic.next();
  }

  getFilterChangeThematic(): Subject<void> {
    return this.filterChangeThematic;
  }

  resetVariables() {
    this.checkedServices = [];
    this.checkedThematics = [];
  }

  getServiceId(value: number): number {
    return value;
  }

}

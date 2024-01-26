import { Injectable } from '@angular/core';
import { ServiceModel } from '../models/service-model';
import { TimelineModel, TimelineModelWithService } from '../models/timeline-model';
import { Thematic } from '../models/thematic-model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  services!: TimelineModelWithService[];
  servicesFilter!: TimelineModelWithService[];
  thematics!: Thematic[];

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

  resetVariables() {
    this.checkedServices = [];
    this.checkedThematics = [];
  }

  getServiceId(value: number): number {
    return value;
  }

}

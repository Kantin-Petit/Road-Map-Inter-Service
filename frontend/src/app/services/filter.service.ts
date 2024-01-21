import { Injectable } from '@angular/core';
import { ServiceModel, TimelineModel } from '../models/service-model';
import { Thematic } from '../models/thematic-model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  services: { [key: string]: ServiceModel } = {};
  servicesFilter: { [key: string]: ServiceModel } = {};
  thematics: { [key: string]: Thematic } = {};

  checkedServices: { [key: string]: boolean } = {};
  checkedServicesInit: { [key: string]: boolean } = {};
  checkedSubjects: { [key: string]: { [innerKey: string]: boolean } } = {};

  sidebarVisible: boolean = false;
  sidebarData!: TimelineModel;
  selectedItemIndex!: string | null;
  selectTimeline!: string;

  isCollapsed: boolean = false;
  isOpen: { [key: string]: boolean } = {};

  isFullLoad: boolean = false;

  private filterChangeSubject: Subject<void> = new Subject<void>();

  getFilterChangeObservable(): Observable<void> {
    return this.filterChangeSubject.asObservable();
  }

  setServicesFilter(status: boolean): void {
    this.isFullLoad = status;
    this.filterChangeSubject.next();
  }

  resetVariables() {
    this.checkedServices = {};
    this.checkedSubjects = {};
  }

}

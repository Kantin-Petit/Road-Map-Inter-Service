import { Component } from '@angular/core';
import { TimelineModel } from '../../models/service-model';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent {

  constructor(public filterService: FilterService) { }

  getColorForSubject(thematicName: string): string {
    const foundSubject = this.filterService.thematics[thematicName];
    return foundSubject ? foundSubject.color : '#000000';
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

}

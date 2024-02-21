import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { TimelineModel } from '../../models/timeline-model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent {

  socketUrl: string = environment.socketUrl;

  constructor(public filterService: FilterService) { }

  toggleSidebar(service: string, timelineData: TimelineModel): void {
    const filterService = this.filterService;

    if (!filterService.sidebarVisible || filterService.selectedItemIndex !== service + timelineData.id) {

      filterService.selectedItemIndex = service + timelineData.id;
      filterService.sidebarData = timelineData;
      filterService.sidebarVisible = true;
    } else {
      filterService.selectedItemIndex = null;
      filterService.sidebarVisible = false;
      filterService.sidebarData = new TimelineModel();
    }
  }

}

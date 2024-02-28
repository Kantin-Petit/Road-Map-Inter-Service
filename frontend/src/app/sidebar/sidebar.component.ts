import { Component, Input } from '@angular/core';
import { TimelineModel } from '../models/timeline-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() sidebarData!: TimelineModel;

  socketUrl: string = environment.socketUrl;

  getImageUrl(timeline: TimelineModel): string {
    return this.socketUrl + '/images/services/service' + timeline.service_id + '/timeline' + timeline.id + '/' + timeline.image;
  }


}

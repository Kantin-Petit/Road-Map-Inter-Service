import { Component, Input } from '@angular/core';
import { TimelineModel } from '../models/service-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() sidebarData!: TimelineModel;

}
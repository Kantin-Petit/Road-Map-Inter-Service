import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineCommunicationComponent } from './timeline-communication/timeline-communication.component';
import { TimelinePlanningComponent } from './timeline-planning/timeline-planning.component';
import { PlayoutComponent } from './playout/playout.component';



@NgModule({
  declarations: [
    TimelineCommunicationComponent,
    TimelinePlanningComponent,
    PlayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublicModule { }

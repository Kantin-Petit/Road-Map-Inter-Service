import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineCommunicationComponent } from './timeline-communication/timeline-communication.component';
import { TimelinePlanningComponent } from './timeline-planning/timeline-planning.component';

const routes: Routes = [
  { path: '', component: TimelineCommunicationComponent},

  { path: 'timeline-communication', component: TimelineCommunicationComponent },
  { path: 'timeline-planning', component: TimelinePlanningComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

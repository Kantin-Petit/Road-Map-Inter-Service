import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineCommunicationComponent } from './timeline-communication/timeline-communication.component';
import { TimelinePlanningComponent } from './timeline-planning/timeline-planning.component';
import { PlayoutComponent } from './playout/playout.component';
import { PublicRoutingModule } from './public-routing.module';
import { PheaderComponent } from './pheader/pheader.component';

import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';

import { SplitterModule } from 'primeng/splitter';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TimelineCommunicationComponent,
    TimelinePlanningComponent,
    PlayoutComponent,
    PheaderComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    
    TimelineModule,
    CardModule,
    
    SplitterModule,
    ButtonModule,
    SidebarModule
  ]
})
export class PublicModule { }

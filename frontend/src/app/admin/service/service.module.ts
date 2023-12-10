import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { SindexComponent } from './sindex/sindex.component';
import { SeditComponent } from './sedit/sedit.component';
import { SaddComponent } from './sadd/sadd.component';
import { SdeleteComponent } from './sdelete/sdelete.component';


@NgModule({
  declarations: [
    SindexComponent,
    SeditComponent,
    SaddComponent,
    SdeleteComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }

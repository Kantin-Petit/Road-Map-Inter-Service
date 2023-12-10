import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UindexComponent } from './uindex/uindex.component';
import { UeditComponent } from './uedit/uedit.component';
import { UaddComponent } from './uadd/uadd.component';
import { UdeleteComponent } from './udelete/udelete.component';


@NgModule({
  declarations: [
    UindexComponent,
    UeditComponent,
    UaddComponent,
    UdeleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './dashboard-routing.module';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AdminComponent } from '../admin/admin.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    SidemenuComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    AccordionModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    TagModule,
    DropdownModule
  ]
})
export class AdminModule { }

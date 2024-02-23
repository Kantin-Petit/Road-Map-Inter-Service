import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { AdminServiceComponent } from './admin/admin-service/admin-service.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminThematicComponent } from './admin/admin-thematic/admin-thematic.component';
import { DashboardComponent } from './dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminTimelineComponent } from './admin/admin-timeline/admin-timeline.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    SidemenuComponent,
    AdminServiceComponent,
    AdminUserComponent,
    AdminThematicComponent,
    AdminTimelineComponent,
    DashboardComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    FileUploadModule,
    TableModule,
    ToastModule,
    ColorPickerModule,
    ToolbarModule,
    AccordionModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }

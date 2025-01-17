import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
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
import { AdminServiceComponent } from './admin/admin-service/admin-service.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminThematicComponent } from './admin/admin-thematic/admin-thematic.component';
import { DashboardComponent } from './dashboard.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    SidemenuComponent,
    AdminServiceComponent,
    AdminUserComponent,
    AdminThematicComponent,
    DashboardComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    TableModule,
    ToastModule,
    ColorPickerModule,
    ToolbarModule,
    RatingModule,
    AccordionModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    TagModule,
    DropdownModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

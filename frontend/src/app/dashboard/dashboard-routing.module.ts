import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminServiceComponent } from './admin/admin-service/admin-service.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard.component';
import { AdminTimelineComponent } from './admin/admin-timeline/admin-timeline.component';
import { adminGuard } from '../guards/admin.guard';
import { AdminThematicComponent } from './admin/admin-thematic/admin-thematic.component';
import { OptionThematicComponent } from './admin/option-thematic/option-thematic.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      { path: 'profil', component: ProfilComponent },
      {
        path: 'services', component: AdminServiceComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'thematiques', component: AdminThematicComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'utilisateurs', component: AdminUserComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'timelines', component: AdminTimelineComponent,
      },
      { path: 'timelines/option_thematic', component: OptionThematicComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

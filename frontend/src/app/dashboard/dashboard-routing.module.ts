import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminServiceComponent } from './admin/admin-service/admin-service.component';
import { AdminThematicComponent } from './admin/admin-thematic/admin-thematic.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard.component';
import { AdminTimelineComponent } from './admin/admin-timeline/admin-timeline.component';
import { ServiceAdminGuard } from '../_utils/service-admin-guard.guard';
import { AdminGuard } from '../_utils/admin-guard.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full'},
      { path: 'profil', component: ProfilComponent },
      { path: 'services', component: AdminServiceComponent,
        canActivate: [ServiceAdminGuard] 
      },
      { path: 'thematiques', component: AdminThematicComponent,
        canActivate: [AdminGuard] 
      },
      { path: 'utilisateurs', component: AdminUserComponent,
        canActivate: [AdminGuard] 
      },
      { path: 'timelines', component: AdminTimelineComponent,
        canActivate: [AdminGuard]
      },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

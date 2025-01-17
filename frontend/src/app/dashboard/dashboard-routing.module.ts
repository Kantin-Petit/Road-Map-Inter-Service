import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminServiceComponent } from './admin/admin-service/admin-service.component';
import { AdminThematicComponent } from './admin/admin-thematic/admin-thematic.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full'},
      { path: 'profil', component: ProfilComponent },
      { path: 'services', component: AdminServiceComponent },
      { path: 'thematiques', component: AdminThematicComponent },
      { path: 'utilisateurs', component: AdminUserComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

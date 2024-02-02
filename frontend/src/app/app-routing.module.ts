import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DashboardGuard } from './_utils/auth.guard';
import { LoggedGuard } from './_utils/loggin-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(res => res.DashboardModule),
    canActivate: [DashboardGuard],
  },
  { path: 'connexion', 
    component: ConnexionComponent,
    canActivate: [LoggedGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

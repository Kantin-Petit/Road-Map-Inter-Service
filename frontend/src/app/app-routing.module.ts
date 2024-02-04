import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'connexion',
    component: ConnexionComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(res => res.DashboardModule),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

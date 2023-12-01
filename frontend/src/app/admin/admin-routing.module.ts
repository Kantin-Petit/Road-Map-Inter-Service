import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlayoutComponent } from './alayout/alayout.component';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '', component AlayoutComponent, children: 
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'user', loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule)
      },
      {
        path: 'service', loadChildren: () => import('./service/service.module')
          .then(m => m.ServiceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

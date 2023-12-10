import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UindexComponent } from './uindex/uindex.component';
import { UeditComponent } from './uedit/uedit.component';
import { UaddComponent } from './uadd/uadd.component';
import { UdeleteComponent } from './udelete/udelete.component';

const routes: Routes = [
  { path: '', component: UindexComponent },
  { path: 'edit/:id', component: UeditComponent},
  { path: 'add', component: UaddComponent},
  { path: 'delete/:id', component: UdeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

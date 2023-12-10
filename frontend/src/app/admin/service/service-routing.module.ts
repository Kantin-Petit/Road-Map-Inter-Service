import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SindexComponent } from './sindex/sindex.component';
import { SeditComponent } from './sedit/sedit.component';
import { SaddComponent } from './sadd/sadd.component';
import { SdeleteComponent } from './sdelete/sdelete.component';

const routes: Routes = [
  { path: '', component: SindexComponent },
  { path: 'edit/:id', component: SeditComponent},
  { path: 'add', component: SaddComponent},
  { path: 'delete/:id', component: SdeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }

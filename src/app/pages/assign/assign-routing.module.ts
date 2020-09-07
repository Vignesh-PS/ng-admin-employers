import { Routes, RouterModule } from "@angular/router";
import { AssignsComponent } from './assign.component';
import { NgModule } from '@angular/core';
import { AssignDetailComponent } from './assign-detail/assign-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AssignsComponent
  },{
    path: ':action/:assign',
    component: AssignDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssignsRouting{}

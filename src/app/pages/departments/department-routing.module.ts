import { Routes, RouterModule } from "@angular/router";
import { DepartmentsComponent } from './departments.component';
import { NgModule } from '@angular/core';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent
  },{
    path: ':action/:department',
    component: DepartmentDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DepartmentsRouting{}

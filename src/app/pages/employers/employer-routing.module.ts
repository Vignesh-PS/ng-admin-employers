import { Routes, RouterModule } from "@angular/router";
import { EmployersComponent } from './employers.component';
import { NgModule } from '@angular/core';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EmployersComponent
  },{
    path: ':action/:employer',
    component: EmployerDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployersRouting{}

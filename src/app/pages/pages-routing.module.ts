import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
       { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      {
        path: 'dashboard',
        loadChildren: ()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },{
        path: 'employers',
        loadChildren: ()=> import('./employers/employers.module').then(m => m.EmployersModule)
      },
      {
        path: 'departments',
        loadChildren: ()=> import('./departments/departments.module').then(m => m.DepartmentsModule)
      },{
        path: 'assignment',
        loadChildren: ()=> import('./assign/assign.module').then(m => m.AssignsModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRouting{}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard-routing.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployersComponent } from './employers.component';
import { EmployersRouting } from './employer-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';



@NgModule({
  declarations: [EmployersComponent, EmployerDetailComponent],
  imports: [
    CommonModule,
    EmployersRouting,
    NgbPaginationModule,
    FormsModule
  ],
  entryComponents: [EmployerDetailComponent, EmployersComponent]
})
export class EmployersModule { }

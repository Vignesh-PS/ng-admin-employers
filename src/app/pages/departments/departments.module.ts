import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsRouting } from './department-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';



@NgModule({
  declarations: [DepartmentsComponent, DepartmentDetailComponent],
  imports: [
    CommonModule,
    DepartmentsRouting,
    NgbPaginationModule,
    FormsModule
  ],
  entryComponents: [DepartmentDetailComponent, DepartmentsComponent]
})
export class DepartmentsModule { }

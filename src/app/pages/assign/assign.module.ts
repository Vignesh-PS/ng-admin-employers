import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignsComponent } from './assign.component';
import { AssignsRouting } from './assign-routing.module';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AssignDetailComponent } from './assign-detail/assign-detail.component';



@NgModule({
  declarations: [AssignsComponent, AssignDetailComponent],
  imports: [
    CommonModule,
    AssignsRouting,
    NgbPaginationModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [AssignDetailComponent, AssignsComponent]
})
export class AssignsModule { }

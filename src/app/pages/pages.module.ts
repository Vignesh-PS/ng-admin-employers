import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PagesRouting } from './pages-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PagesComponent, SidebarComponent, HeaderComponent],
  imports: [
    CommonModule,
    PagesRouting,
    NgbDropdownModule
  ],
  entryComponents: [
    SidebarComponent, HeaderComponent
  ]
})
export class PagesModule { }

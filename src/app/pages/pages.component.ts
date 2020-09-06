import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  collapedSideBar: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}

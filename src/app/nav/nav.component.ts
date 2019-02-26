import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle: string = 'TERMINAL';
  appVersion: string = '2.0.1';

  constructor() { }

  ngOnInit() {
  }

}

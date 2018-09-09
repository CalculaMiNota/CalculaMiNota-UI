import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}


  ngOnInit() {
    this.document.body.classList.add('theme-cyan');
  }

}

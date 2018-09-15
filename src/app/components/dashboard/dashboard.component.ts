import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  public loading:boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document) {}


  ngOnInit() {
    this.document.body.classList.add('theme-cyan');
    this.loading = false;
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }
}

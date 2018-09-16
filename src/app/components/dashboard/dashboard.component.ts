import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
import { AuthService } from '../../shared/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public loading: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document, private auth: AuthService) { }


  ngOnInit() {
    this.document.body.classList.add('theme-cyan');
    this.loading = false;
  }

  ngAfterViewInit(): void {
    this.loading = false;

    $(function () {
      $.AdminBSB.browser.activate();
      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();
      $.AdminBSB.input.activate();
      $.AdminBSB.select.activate();
      $.AdminBSB.search.activate();

      setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
    });

  }
}

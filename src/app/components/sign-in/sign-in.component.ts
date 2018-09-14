import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
//import * as $ from '../../../assets/plugins/jquery/jquery.min.js';
import * as notify from '../../../assets/plugins/bootstrap-notify/bootstrap-notify.js';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.body.classList.add('login-page');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page');
  }

}

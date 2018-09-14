import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
import * as $ from '../../../assets/plugins/jquery/jquery.min.js';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.body.classList.add('login-page');
    $('body').notify({
      message: 'Hello World',
      type: 'danger'
    });
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page');
  }

}

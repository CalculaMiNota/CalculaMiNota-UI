import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.body.classList.add('fp-page');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('fp-page');
  }

  enviarCorreo(){
    console.log("Funcion de enviar correo no esta implementada");
  }

}

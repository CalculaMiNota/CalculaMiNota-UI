import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public emailForgotPassword:string;
  constructor(@Inject(DOCUMENT) private document: Document,
    private http: HttpService) {

  }

  ngOnInit() {
    this.document.body.classList.add('fp-page');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('fp-page');
  }

  enviarCorreo() {

    let url = 'usuarios/password/email'

    //Objeto a enviar al servidor
    let toSendData = {
      email: this.emailForgotPassword
    };

    this.http.post(url, toSendData).subscribe(res => {
      console.log(res);
    },
    error => {
      console.log(error);
      
    });
    console.log("Funcion de enviar correo no esta implementada");
  }

}

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
//import * as $ from '../../../assets/plugins/jquery/jquery.min.js';
import * as notify from '../../../assets/plugins/bootstrap-notify/bootstrap-notify.js';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { Validation } from '../../shared/classes/validation';
declare var jquery: any;
declare var $: any;
declare let swal: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  public emailSingIn: string = "";
  public passwordSignIn: string = "";
  private validation: Validation;
  private router: Router;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpService,
    router: Router) {
    this.router = router;
    this.validation = new Validation();
  }

  ngOnInit() {
    this.document.body.classList.add('login-page');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page');
  }

  login() {
    let url = 'usuarios/login'

    //Objeto a enviar al servidor
    let toSendData = {
      email: this.emailSingIn,
      password: this.passwordSignIn
    };

    this.http.post(url, toSendData).subscribe(data => {
      let router = this.router;
      if(data['status'] === 'ok'){
        window.location.href = '/dashboard';
        //router.navigate(['/dashboard']);
      }
      
    }, error => {
      
      swal({
        title: "Error",
        text: "Ha ocurrido un problema con el registro",
        type: "error",
      });

    });
  }

}

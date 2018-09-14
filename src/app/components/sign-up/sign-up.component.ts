import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
import {NgForm} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../shared/services/http.service';
import { Validation } from '../../shared/classes/validation';
import { Utilities } from '../../shared/classes/utilities';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
declare var jquery:any;
declare var $ :any;
declare let swal: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public emailSingUp:string = "";
  public passwordSignUp:string = "";
  public confirmPasswordSignUp:string = "";
  private validation: Validation;
  private router: Router;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private http: HttpService, 
    router: Router) 
  {
    this.router = router;
    
    this.validation = new Validation();
  }

  ngOnInit() {
    this.document.body.classList.add('signup-page');
    this.validation.createSignUpValidation();
  }

  ngOnDestroy() {
    this.document.body.classList.remove('signup-page');
  }

  registrarse(){
    if(!this.validation.validateSingUp())
    {
      Utilities.notificarError("Datos no válidos");
      return;
    }
      
    //Objeto a enviar al servidor
    let toSendData = {
      email : this.emailSingUp,
      password : this.passwordSignUp
    };
    
    this.http.post('usuarios/registro', toSendData).subscribe(data=>{
      let router = this.router;
      swal({
        title: "Registro completo!",
        type: "success",
      }, function(){
        router.navigate(['/sign-in']);
      });

    }, error=>{
      this.validation.validateSingUp();
      swal({
        title: "Error",
        text: "Ha ocurrido un problema con el registro",
        type: "error",
      });
      
    });
    

    
  }

}

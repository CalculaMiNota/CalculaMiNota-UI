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


  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpService, private router: Router) {}

  ngOnInit() {
    this.document.body.classList.add('signup-page');
    Validation.createSignUpValidation();
  }

  ngOnDestroy() {
    this.document.body.classList.remove('signup-page');
  }

  registrarse(){
    if(!Validation.validateSingUp())
    {
      Utilities.notificarError("Datos no válidos", true);
      return;
    }
      
    //Objeto a enviar al servidor
    let toSendData = {
      email : this.emailSingUp,
      password : this.passwordSignUp
    };
    
    this.http.post('usuarios/registro', toSendData).subscribe(data=>{
      
      swal({
        title: "Registro completo!",
        type: "success",
      }, function(){
        this.router.navigate(['/sign-in']);
      });
      swal("Registro completo!", "", "success");
    }, error=>{
      swal({
        title: "Error",
        text: JSON.stringify(error),
        type: "error",
      });
      
    });
    

    
  }

}

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/common';
import {NgForm} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public emailSingUp:string = "email@test.com";
  public passwordSignUp:string = "123456";
  public confirmPasswordSignUp:string = "123456";


  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpService) {}

  ngOnInit() {
    this.document.body.classList.add('signup-page');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('signup-page');
  }

  validarForm(){
    return this.validarCorreosIguales();
  }

  validarCorreosIguales(){ 
    return this.confirmPasswordSignUp === this.passwordSignUp;
  }

  registrarse(){
    if(!this.validarForm())
    {
      alert("Contraseñas no coinciden")
      return;
    }
      
    //Objeto a enviar al servidor
    let toSendData = {
      email : this.emailSingUp,
      password : this.passwordSignUp
    };
    
    this.http.post('usuarios/registro', toSendData).subscribe(data=>{
      alert(JSON.stringify(data));
      console.log(data)
    }, error=>{
      alert(JSON.stringify(error));
    });
    

    
  }

}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpService) { }

  public isLogged(){
    if(environment.production === true){
      if (!location.origin.includes('https://calculaminota.herokuapp.com')){
        location.href = 'https://calculaminota.herokuapp.com' + location.pathname;
      }
    }
    return this.http.get('usuarios/isLogged');
  }

  public logout(){
    return this.http.get('usuarios/logout');
  }

  public getUserInfo(){
    return this.http.get('usuarios/getUserInfo');
  }
}

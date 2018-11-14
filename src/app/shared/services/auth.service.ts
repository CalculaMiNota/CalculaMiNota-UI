import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpService) { }

  public isLogged(){
    return this.http.get('usuarios/isLogged');
  }

  public logout(){
    return this.http.get('usuarios/logout');
  }

  public getUserInfo(){
    return this.http.get('usuarios/getUserInfo');
  }
}

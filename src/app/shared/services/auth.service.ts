import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

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
}

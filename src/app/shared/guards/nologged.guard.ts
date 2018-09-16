import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NologgedGuard implements CanActivate {

  constructor(private login:AuthService, public router: Router) {}
  canActivate():Observable<boolean> {
    return this.login.isLogged().pipe(map(res => {
      //Response comes as string
      if(res['logged'] == 'false')
      {
        return true;
      }        
      else
      {
        window.location.replace('/dashboard');
        return false;
      }
    }));
  }
}
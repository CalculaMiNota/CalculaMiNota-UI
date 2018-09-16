import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private auth:AuthService, public router: Router) {}
  canActivate():Observable<boolean> {
    return this.auth.isLogged().pipe(map(res => {
      //Response comes as string
      if(res['logged'] == 'true')
      {
        return true;
      }        
      else
      {
        window.location.replace('/');
        return false;
      }
    }));
  }
}
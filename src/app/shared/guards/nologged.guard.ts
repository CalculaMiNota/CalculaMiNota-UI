import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NologgedGuard implements CanActivate {

  constructor(private login:AuthService, public router: Router) {}
  canActivate():Observable<boolean> {
    return this.login.isLogged().pipe(map(res => {
      if (environment.production && (location.protocol !== 'https:')) {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        return false;
      }

      //Response comes as string
      if(res['logged'] == 'false')
      {
        return true;
      }        
      else
      {
        window.location.replace('/app');
        return false;
      }
    }, error =>{
      return true;
    }));
  }
}
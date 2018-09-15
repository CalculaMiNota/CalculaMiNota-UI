import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private login:LoginService, public router: Router) {}
  canActivate(): boolean {
    console.log(this.login.isLogged())
    if(this.login.isLogged())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NologgedGuard implements CanActivate {

  constructor(private login:LoginService, public router: Router) {}
  canActivate(): boolean {
    console.log(this.login.isLogged())
    if(this.login.isLogged())
    {
      this.router.navigate(['/dashboard']);
      return false;
    }
    else
    {
      return true;
    }
  }
}
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpService) { }

  public isLogged(){
    //console.log(this.http.get('usuarios/isLogged'))
    return this.http.get('usuarios/isLogged').pipe(map(data => {

      return true;

    }));
    /*.subscribe(data => {
      if(data['logged'] == 'true')  
      {
        return true;
      }
      else{
      return false;
      }
    }, error => {
      return false;
    })*/
  }

}

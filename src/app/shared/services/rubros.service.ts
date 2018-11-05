import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Rubro } from '../classes/rubro';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {


  constructor(private http: HttpService, private auth: AuthService) { }

  saveRubroCursos(rubro:Rubro) {
    return this.http.post('rubros', rubro);
  }

  deleteRubro(rubroId:number){
    let data = {
      id: rubroId
    }
    return this.http.post('rubros/delete', data);
  }

}

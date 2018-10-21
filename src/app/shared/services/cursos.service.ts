import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Curso } from '../classes/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpService, private auth:AuthService) { }

  getCursos(email:string, all:boolean = false){
    return this.http.get('cursos?email=' + email + '&all='+all);
  }

}

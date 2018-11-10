import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/shared/classes/curso';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RubrosService } from 'src/app/shared/services/rubros.service';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { DashboardData } from 'src/app/shared/classes/dashboard-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public cursos: Curso[];
  private usuarioEmail: string;
  public data: DashboardData[];

  constructor(private http: HttpService,
    private auth: AuthService,
    private cursosService: CursosService,
    private rubrosService: RubrosService) {

  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.auth.getUserInfo().subscribe(res => {
      if (res['logged'] != 'false') {
        this.usuarioEmail = res['email'];
        this.loadCursos();
      }
    });
  }

  loadCursos() {
    this.cursosService.getDashboardData().subscribe(res => {
      this.data = res as DashboardData[];
    });
  }


}

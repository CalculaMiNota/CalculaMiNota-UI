import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StaticUtilties } from '../../shared/classes/validation';
import { HttpService } from '../../shared/services/http.service';
import { AuthService } from '../../shared/services/auth.service';
import { CursosService } from '../../shared/services/cursos.service';
import { Curso } from '../../shared/classes/curso';
import { Rubro } from 'src/app/shared/classes/rubro';
import { RubrosService } from 'src/app/shared/services/rubros.service';
import { Utilities } from 'src/app/shared/classes/utilities';
declare var $: any;
@Component({
  selector: 'app-estimaciones',
  templateUrl: './estimaciones.component.html',
  styleUrls: ['./estimaciones.component.scss']
})
export class EstimacionesComponent implements OnInit, AfterViewInit {
  public cursos: Curso[];
  private usuarioEmail: string;
  
  constructor(private http: HttpService,
    private auth: AuthService,
    private cursosService: CursosService,
    private rubrosService: RubrosService) {

  }

  ngOnInit() {
    this.loadUserInfo();
  }
  ngAfterViewInit() {
    StaticUtilties.initializeInputs();
  }

  sumaFinal(id: string = 'nuevasCalificacionesTable', posicion: number = 1) {
    let trs = $("#" + id).find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#" + id + " tbody tr")[i].children[posicion].textContent)
    }

    return isNaN(sum) ? '-' : sum;
  }

  calculaNotaFinal(id: string, base: number) {
    let trs = $("#" + id).find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;
    let puntajeRubro = 0;
    let notaRubro = 0;
    for (let i = 0, end = trs.length; i < end; i++) {
      puntajeRubro = parseInt($("#" + id + " tbody tr")[i].children[1].textContent)
      notaRubro = parseInt($("#" + id + " tbody tr")[i].children[2].textContent)
      sum += (puntajeRubro / base) * notaRubro
    }
    
    return isNaN(sum) ? '-' : (sum % 1 != 0) ? sum.toFixed(2) : sum
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
    this.cursosService.getCursos(this.usuarioEmail, true).subscribe(res => {
      this.cursos = res as Curso[];
      $.AdminBSB.input.activate();
    });
  }

  selectCurso(id) {
    let that = this
    $('#rubros_' + id).editableTableWidget();
    $.AdminBSB.input.activate();
  }
}

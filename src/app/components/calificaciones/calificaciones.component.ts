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
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit, AfterViewInit {

  public nombreCursoNuevo: string = "";
  public puntajeTotalCursoNuevo: number = 100;
  public cursos: Curso[];
  private usuarioEmail: string = "";
  private tabla;

  constructor(private http: HttpService,
    private auth: AuthService,
    private cursosService: CursosService,
    private rubrosService: RubrosService) {

  }

  ngOnInit() {
    this.tabla = $('#nuevasCalificacionesTable').editableTableWidget();
    this.loadUserInfo();
  }
  ngAfterViewInit() {
    StaticUtilties.initializeInputs();
  }

  addRow(id: string = 'nuevasCalificacionesTable') {
    $("#" + id).find('tbody').append('<tr><td tabindex="1">Nombre</td><td tabindex="1">1</td>/tr>');
  }

  sumaMedio(id: string = 'nuevasCalificacionesTable') {
    let trs = $("#" + id ).find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#" + id + " tbody tr")[i].children[1].textContent) * parseInt($("#" + id + " tbody tr")[i].children[2].textContent);
    }

    return sum;
  }

  sumaFinal(id: string = 'nuevasCalificacionesTable', posicion: number = 1) {
    let trs = $("#" + id).find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#" + id + " tbody tr")[i].children[posicion].textContent)
    }

    return sum;
  }

  calculaNotaFinal(id:string, base:number){
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
    if (sum % 1 != 0)
      return sum.toFixed(2);
    return sum;
  }

  loadUserInfo() {
    this.auth.getUserInfo().subscribe(res => {
      if (res['logged'] != 'false') {
        this.usuarioEmail = res['email'];
        this.loadCursos();
      }
    });
  }

  loadCursos(){
    this.cursosService.getCursos(this.usuarioEmail, true).subscribe(res => {
      this.cursos = res as Curso[];
      $.AdminBSB.input.activate();
    });
  }

  selectCurso(id)
  {
    let that = this
    $('#rubros_' + id).editableTableWidget();
    $('#rubros_' + id + ' td').on('change', function (evt, newValue) {
      //Evitar que se llame multiples veces sin sentido
      evt.stopImmediatePropagation();
      let trs = evt.currentTarget.parentNode.children
      let rubroId = parseInt(trs[3].textContent);
      let nombre:string = trs[0].textContent
      let puntaje:number = parseInt(trs[1].textContent)
      let nota:number = parseInt(trs[2].textContent)
      that.actualizaRubro(id, rubroId, nombre, puntaje, nota);
    });
    
    $.AdminBSB.input.activate();
  }

  getRubrosACrear(){
    
    let trs = $("#nuevasCalificacionesTable").find('tbody').find('tr');
    if (trs.length == 0)
      return [];

    let rubros = [];

    for (let i = 0, end = trs.length; i < end; i++) {
      rubros.push({
        nombre: $("#nuevasCalificacionesTable tbody tr")[i].children[0].textContent,
        puntaje: $("#nuevasCalificacionesTable tbody tr")[i].children[1].textContent
      });
    }
    return rubros
  }

  guardarCurso() {
    console.log(this.nombreCursoNuevo);

    console.log("La funcion para guardar no esta implementada");

    let url = 'cursos'

    //Objeto a enviar al servidor
    let toSendData = {
      nombreCurso: this.nombreCursoNuevo,
      puntajeTotal: this.puntajeTotalCursoNuevo,
      email: this.usuarioEmail
    };
    
    //Guardar Curso para Usuario
    this.http.post(url, toSendData).subscribe(res => {
      console.log(res);
      let cursoId = res['id'];
      //Guardar cada Rubro
      let urlRubros = 'rubros/multiple'

      //Objeto a enviar al servidor
      let toSendDataRubros = {
        cursoId: cursoId,
        rubros: this.getRubrosACrear()
      };

      this.http.post(urlRubros, toSendDataRubros).subscribe(res => {
        
        this.loadCursos();
      }, error => {
        
      });

    }, error => {
        
    });

  }

  actualizaRubro(cursoId: number, rubroId: number, nombre:string, puntaje:number, nota:number){
    let curso:Curso = this.cursos.find(function (element) {
      return element.id == cursoId;
    });

    let rubro:Rubro = curso.rubros.find(function (element) {
      return element.id == rubroId;
    });

    
    rubro.nombre = nombre;
    rubro.nota_actual = nota;
    rubro.porcentaje = puntaje;
    this.rubrosService.saveRubroCursos(rubro).subscribe(res =>{
      Utilities.notificarExito("Se ha actualizado correctamente", false);
      console.log(res);
    }, error => {
      Utilities.notificarError("Ha ocurrido un error al actualizar", false);
      console.log(error);
    })
    
  }

}

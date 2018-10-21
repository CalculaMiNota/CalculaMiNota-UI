import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StaticUtilties } from '../../shared/classes/validation';
import { HttpService } from '../../shared/services/http.service';
import { AuthService } from '../../shared/services/auth.service';
import { CursosService } from '../../shared/services/cursos.service';
import { Curso } from '../../shared/classes/curso';
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
    private cursosService: CursosService) {

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

  sumaMedio() {
    let trs = $("#nuevasCalificacionesTable").find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#nuevasCalificacionesTable tbody tr")[i].children[1].textContent) * parseInt($("#nuevasCalificacionesTable tbody tr")[i].children[2].textContent);
    }

    return sum;
  }

  sumaFinal() {
    let trs = $("#nuevasCalificacionesTable").find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#nuevasCalificacionesTable tbody tr")[i].children[1].textContent)
    }

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
      this.cursos.forEach(curso => {
        $('#rubros_' + curso.id).editableTableWidget();
      })
      $.AdminBSB.input.activate();
    });
  }

  selectCurso(id)
  {
    console.log(id)

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
      let urlRubros = 'rubros'

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

}

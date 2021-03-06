import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StaticUtilties } from '../../shared/classes/validation';
import { HttpService } from '../../shared/services/http.service';
import { AuthService } from '../../shared/services/auth.service';
import { CursosService } from '../../shared/services/cursos.service';
import { Curso } from '../../shared/classes/curso';
import { Rubro } from 'src/app/shared/classes/rubro';
import { RubrosService } from 'src/app/shared/services/rubros.service';
import { Utilities } from 'src/app/shared/classes/utilities';
import { ActivatedRoute, ParamMap } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit, AfterViewInit {

  public nombreCursoNuevo: string = "";
  public puntajeTotalCursoNuevo: number = 100;
  public minimoCursoNuevo: number = 70;
  public cursos: Curso[];
  private usuarioEmail: string = "";
  private tabla;
  private idActual: string;

  constructor(private http: HttpService,
    private auth: AuthService,
    private cursosService: CursosService,
    private rubrosService: RubrosService,
    private route: ActivatedRoute) {
        
  }

  ngOnInit() {
    this.tabla = $('#nuevasCalificacionesTable').editableTableWidget();
    this.loadUserInfo();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idActual = params.get('id');
    });
  }
  ngAfterViewInit() {
    StaticUtilties.initializeInputs();
  }

  addRow(id: string = 'nuevasCalificacionesTable') {
    if (id === 'nuevasCalificacionesTable')
    {
      $("#" + id).find('tbody').append('<tr><td tabindex="1">Nombre</td><td tabindex="1">0</td>/tr>');
    }
    else
    {
      this.creaRubro(parseInt(id), 'Nombre', 0, 0)
    }
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
    
    return (sum % 1 != 0) ? sum.toFixed(2) : sum
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
      let rubroId;
      if (typeof trs[3] !== 'undefined')
        rubroId = parseInt(trs[3].textContent);
      else
        rubroId = 0
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
      email: this.usuarioEmail,
      minimo: this.minimoCursoNuevo
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

  notificaExito(texto: string = "Se ha actualizado correctamente") {
    Utilities.notificarExito(texto, false);
  }

  notificaError(texto: string = "Ha ocurrido un error al actualizar") {
    Utilities.notificarError(texto, false);
  }

  actualizaRubro(cursoId: number, rubroId: number, nombre: string, puntaje: number, nota: number) {
    let curso: Curso = this.cursos.find(function (element) {
      return element.id == cursoId;
    });

    let rubro: Rubro = curso.rubros.find(function (element) {
      return element.id == rubroId;
    });

    if (rubroId == 0) {
      rubro = new Rubro();
      rubro.curso_id = cursoId
    }

    rubro.nombre = nombre;
    rubro.nota_actual = nota;
    rubro.porcentaje = puntaje;
    this.rubrosService.saveRubroCursos(rubro).subscribe(res => {
      this.notificaExito()
    }, error => {
      this.notificaError()
    })

  }

  creaRubro(cursoId: number, nombre: string, puntaje: number, nota: number) {
    let rubro: Rubro = new Rubro();
    rubro.curso_id = cursoId
    rubro.nombre = nombre;
    rubro.nota_actual = nota;
    rubro.porcentaje = puntaje;
    this.rubrosService.saveRubroCursos(rubro).subscribe(res => {

      let curso: Curso = this.cursos.find(function (element) {
        return element.id == cursoId;
      });

      curso.rubros.push(res as Rubro)
      this.selectCurso(cursoId)
      this.notificaExito()
    }, error => {
      this.notificaError()
    })

  }
  
  actualizaCurso(cursoId: number){
    let curso = this.cursos.find(element =>{
      return element.id == cursoId;
    });
    this.cursosService.saveCurso(curso, this.usuarioEmail).subscribe(res => {
      this.notificaExito()
    }, error => {
      this.notificaError()
    })
  }

  borraCurso(cursoId:number){
    this.cursosService.deleteCurso(cursoId).subscribe(res => {
      this.notificaExito();
      this.cursos = this.cursos.filter(element => {
        return element.id !== cursoId;
      });
    }, error => {
      this.notificaError();
    })
  }
  
  borrarRubro(rubroId:number, cursoId:number){
    this.rubrosService.deleteRubro(rubroId).subscribe(res => {
      this.notificaExito("Se ha eliminado el rubro correctamente");
      let curso: Curso = this.cursos.find(function (element) {
        return element.id == cursoId;
      });

      curso.rubros = curso.rubros.filter(function (element) {
        return element.id != rubroId;
      });
    }, error => {
      this.notificaError("Ha ocurrido un problema al eliminar el rubro");
    })
  }
}

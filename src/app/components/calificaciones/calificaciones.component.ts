import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StaticUtilties } from '../../shared/classes/validation';
declare var $: any;
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit, AfterViewInit {

  ngOnInit() {
      $('#nuevasCalificacionesTable').editableTableWidget();
  }
  ngAfterViewInit(){
    StaticUtilties.initializeInputs();
  }

  addRow() {
    $("#nuevasCalificacionesTable").find('tbody').append('<tr><td tabindex="1">Nombre</td><td tabindex="1">1</td><td tabindex="1">0</td></tr>');
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
      sum += parseInt($("#nuevasCalificacionesTable tbody tr")[i].children[2].textContent)
    }

    return sum;
  }

  guardar()
  {
    console.log("La funcion para guardar no esta implementada");
    
  }

}

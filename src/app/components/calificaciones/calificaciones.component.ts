import { Component, OnInit } from '@angular/core';
import { StaticUtilties } from '../../shared/classes/validation';
declare var $: any;
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {

  ngOnInit() {

    $(function () {
      $('#mainTable').editableTableWidget();
      StaticUtilties.initializeInputs();
    });
  }

  addRow() {
    //let row = this.generateRow();
    $("#mainTable").find('tbody').append('<tr><td tabindex="1">Nombre</td><td tabindex="1">1</td><td tabindex="1">0</td></tr>');
  }

  sumaMedio() {
    let trs = $("#mainTable").find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#mainTable tbody tr")[i].children[1].textContent) * parseInt($("#mainTable tbody tr")[i].children[2].textContent);
    }

    return sum;
  }

  sumaFinal() {
    let trs = $("#mainTable").find('tbody').find('tr');
    if (trs.length == 0)
      return 0;

    let sum = 0;

    for (let i = 0, end = trs.length; i < end; i++) {
      sum += parseInt($("#mainTable tbody tr")[i].children[2].textContent)
    }

    return sum;
  }

}

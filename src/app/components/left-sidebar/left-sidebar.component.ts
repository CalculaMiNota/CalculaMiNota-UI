import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  public nombre:string = "";
  public email:string = "";

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.auth.getUserInfo().subscribe(res=>{
      if(res['logged'] != 'false')
      {
        this.nombre = res['name'];
        this.email = res['email'];
      }
    });
  }

}

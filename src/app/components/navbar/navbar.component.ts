import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout().subscribe(res=>{
      if(res['logged'] == 'false'){
        window.sessionStorage.clear();
        Cookie.deleteAll('');

        window.location.replace('/');
      }
    });
    
  }

}

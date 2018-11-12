import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpService } from 'src/app/shared/services/http.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
declare var $: any;
declare let swal: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public newResetPassword:string;
  public newResetPasswordConfirmation:string;
  private email:string;
  private token:string;

  constructor(@Inject(DOCUMENT) private document: Document,
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router) {

  }


  ngOnInit() {
    this.document.body.classList.add('fp-page');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.email = params.get('email');
      this.token = params.get('token');
    });
  }

  ngOnDestroy() {
    this.document.body.classList.remove('fp-page');
  }

  cambiaContrasenia(){
    let toSendData = {
      email: this.email,
      password: this.newResetPassword,
      password_confirmation: this.newResetPasswordConfirmation,
      token: this.token
    }
    this.http.post('password/reset', toSendData).subscribe(data => {
      let router = this.router;
      
      if (data['logged'] === 'true') {

        swal({
          title: "Cambio de contraseña completo!",
          type: "success",
        }, function () {
          router.navigate(['/app']);
        });

      }
      else{
        swal({
          title: "Error",
          text: "Ha ocurrido un problema con el cambio de contraseña",
          type: "error",
        });
      }
      

    }, error => {
      
      swal({
        title: "Error",
        text: "Ha ocurrido un problema con el cambio de contraseña",
        type: "error",
      });

    });
  }

}

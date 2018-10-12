import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import * as $ from '../assets/plugins/jquery/jquery.min.js';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/services/http.service';
import { LogoInicioComponent } from './components/logo-inicio/logo-inicio.component';
import { LoggedGuard } from './shared/guards/logged.guard';
import { NologgedGuard } from './shared/guards/nologged.guard';
import { AuthService } from './shared/services/auth.service';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarsComponent } from './components/sidebars/sidebars.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { EstimacionesComponent } from './components/estimaciones/estimaciones.component';
import { MainComponent } from './components/main/main.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [NologgedGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [NologgedGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [NologgedGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NologgedGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NologgedGuard] },
  { 
    path: 'app', 
    component: DashboardComponent, 
    canActivate: [LoggedGuard],
    children: [
      {
        path: "",
        component: MainComponent
      },{
        path: "calificaciones",
        component: CalificacionesComponent
      },{
        path: "estimaciones",
        component: EstimacionesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    LogoInicioComponent,
    LoaderComponent,
    NavbarComponent,
    SidebarsComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    ContentComponent,
    CalificacionesComponent,
    EstimacionesComponent,
    MainComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

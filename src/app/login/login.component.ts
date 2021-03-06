import { getOrCreateContainerRef } from '@angular/core/src/render3/di';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { CLIENT_ID } from '../config/config';
import { element } from 'protractor';

declare function init_plugins();
// Google
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  // Google
  auth2: any;


  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    init_plugins();

    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  // Google
  googleInit() {
    
    gapi.load('auth2', () => {
      
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });

  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      console.log('Token. ', token );

      this._usuarioService.loginGoogle( token )
          //Fuerzo una redirección
          .subscribe( ( ) => window.location.href = '#/dashboard');

          // Esta es la optima. Pero algunas veces se ve mal en pantalla
          //.subscribe( ( ) => this.router.navigate(['/dashboard']));


    });
  }


  ingresar( forma: NgForm){

    if( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame )
          .subscribe( correcto => this.router.navigate(['/dashboard']));
          
          // {

          //   console.log( resp );

          // });

    
    // console.log('FormaValue', forma.value );
    // this.router.navigate(['/dashboard']);
  }

}

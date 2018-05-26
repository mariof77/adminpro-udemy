import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { arch } from 'os';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarStorage();
    // console.log('Servicio de usuario listo!');

  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }


  cargarStorage() {
    if(localStorage.getItem('token'))
    {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify( usuario ));                

    this.usuario = usuario;
    this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


  loginGoogle( token: string ) {
    
    let url = URL_SERVICIOS + '/login/google';
    
    console.log('Url. ', url);

    return this.http.post( url, { token })
              .map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                return true;
              });
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if( recordar ) {

      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
              .map( (resp: any) => {                

                this.guardarStorage( resp.id, resp.token, resp.usuario );
                
                return true;

              })

  }


  crearUsuario( usuario: Usuario ) {
    
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
          .map( (resp: any) => {

            Swal('Usuario creado', usuario.email, 'success');

            return resp.usuario;
          });
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
        .map((resp: any) => {

          // console.log('actualizar usuario. url. ', url)

          if( usuario._id === this.usuario._id) {
            let usuarioDB: Usuario = resp.usuario;
            this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
          }
          
          Swal('Usuario actualizado', usuario.nombre, 'success' );

          return true;
        });
  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id ) 
        .then( (resp: any) => {
          
          //console.log('*', this.usuario, resp);

          this.usuario.img = resp.usuario.img;
          Swal('Imagen actualizada', this.usuario.nombre, 'success');

          this.guardarStorage( id, this.token, this.usuario);
    })
    .catch( resp => {
      console.log( resp );
    });

  }

  cargarUsuarios( desde: number = 0) {
    
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ){
    
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  
    return this.http.get( url )
            .map((resp: any) => resp.usuarios);

  }

  borrarUsuario( id: string ){
    
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    console.log( url );

    return this.http.delete( url )
          .map( resp => {
              Swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
              return true;
          });

  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  
  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    // NOTE: Hago una referencia, para que cuando la invoque del header.component se vea mas limpio
    // sino tendria que poner this._usuarioService.usuario en vez de this.usuario
    this.usuario = this._usuarioService.usuario;
  }

}

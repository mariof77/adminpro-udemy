import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// import { SettingsService } from './settings/settings.service';
// import { SidebarService } from './shared/sidebar.service';
// import { UsuarioService } from './usuario/usuario.service';

// NOTA. Servicios. Ya tengo todo los servicios en este modulo.
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
    
  ],
  declarations: []
})
export class ServiceModule { }

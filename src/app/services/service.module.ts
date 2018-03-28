import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SettingsService } from './settings/settings.service';
// import { SidebarService } from './shared/sidebar.service';

// NOTA. Servicios. Ya tengo todo los servicios en este modulo.
import {
  SettingsService,
  SidebarService,
  SharedService
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ],
  declarations: []
})
export class ServiceModule { }

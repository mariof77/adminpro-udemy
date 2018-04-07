import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas' , url: '/grafica1' },
        { titulo: 'Promesas' , url: '/promesas' },
        { titulo: 'RxJs' , url: '/rxjs' },
        { titulo: 'Account Settings' , url: '/account-settings' }
      ]        
    }
  ];
  
  constructor() { }

}

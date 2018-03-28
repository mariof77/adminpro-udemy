import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  //NOTA: Hago referencia de todo el DOM. Lo inyecto en el constructor
  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {    
    this.aplicarCheck( link ); 
    this._ajustes.aplicarTema( tema );  
  }

  aplicarCheck( link: any ) {
    
    let selectores: any = document.getElementsByClassName('selector');    

    //Remueve de todos los selectores
    for( let ref of selectores ){
        ref.classList.remove('working');      
    }        
    //agrego el tema seleccionado
    link.classList.add('working');
  }

  colocarCheck( ) {
    
    let selectores: any = document.getElementsByClassName('selector');    

    let tema = this._ajustes.ajustes.tema;

    for( let ref of selectores ){
      if( ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working');
        break;
      }
    }     

  }

}

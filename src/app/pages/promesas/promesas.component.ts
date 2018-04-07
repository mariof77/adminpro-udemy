import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarTres().then( 
      mensaje => console.log('Termino! ', mensaje)
    )
    .catch( error => console.error('Error en la promesa ', error));  
    

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    // NOTE: resolve. Caso exitoso de la promesa
    // NOTE: reject. Caso de error
    return new Promise( (resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador += 1;
        console.log( contador );

        if( contador === 3) {
          //NOTE: reject('Puedo forzar algun error con esta linea');
          resolve(true);
          clearInterval(intervalo);
        }

      }, 1000);
      
    });     
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 
  
    // NOTE: El observador sigue intentando de por vida, por eso lo fijo en dos intentos
    // NOTE: retry es para que siga ejecutando en caso de error.
    this.subscription = this.regresaObservable()    
      //.retry(2)      
      .subscribe( 
        numero => console.log( 'Subs ', numero ),
        error => console.error( 'Error en el obs (con dos intentos)', error ),
        () => console.log( 'El observador termino! ')
  
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Para salir de la subscripcion cuando salgo de la pagina, tengo que definir una variable global 
    // subscription, asi no queda indefinidamente
    this.subscription.unsubscribe();
  }
  
  regresaObservable(): Observable<any> {

    return new Observable( observer => {
      
      let contador = 0;

      let intervalo = setInterval( () => {
  
        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if( contador === 2) {                  
        //   observer.error("Auxilio!");
        // }

      }, 500 );

    })
    .retry(2)
    .map( (resp: any) => {

      return resp.valor;
    })
    .filter( (valor, index)=> {

      if( (valor % 2) === 1){
        // impar
        return true;
      } else {
        // es par
        return false;
      }

      // console.log('Filter ', valor, index);
      // return true;
    });

  }

}

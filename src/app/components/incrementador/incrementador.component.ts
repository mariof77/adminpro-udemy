import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  //NOTA: @Input() -> Es un decorador para recibir los parametros de afuera
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  
  //NOTA: @Output() -> Es un decorador para emitir un valor luego de un evento
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { 
    //console.log('Leyenda ', this.leyenda);
    //console.log('Progreso ', this.progreso);
    console.log('constructor -> progreso ', this.progreso);
  }

  ngOnInit() {
    //leyenda => Viene inicializado desde el html pasado por parametro
    //console.log('Leyenda ', this.leyenda);
    console.log('ngOnInit -> progreso ', this.progreso);

  }

  onChanges( newValue: number) {

    if(newValue >= 100) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }      

    this.txtProgreso.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );    
    this.txtProgreso.nativeElement.focus();
  }

  cambiarValor( valor: number ){

    if( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    } 

    if( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }      
    
    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );   
  }


}

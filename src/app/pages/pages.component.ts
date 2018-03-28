import { Component, OnInit } from '@angular/core';

//NOTA: Puedo llamar a cualquier pluggin, script, tooltip, carrousel que se encuentre fuera de angular
//1. Modifico script original ej. custom.js
//2. Declaro e inicializo en ngOnInit en pantalla login
//3. Declaro e inicializo en ngOnInit en pages que es la pantalla contenedora
declare function init_plugins();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}

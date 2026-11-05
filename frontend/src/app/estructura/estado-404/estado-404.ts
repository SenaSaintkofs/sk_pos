/**
 * En este archivo se define el componente Estado404, que representa la página de error 404 en la aplicación Angular.
 * La página de error 404 se muestra cuando un usuario intenta acceder a una ruta que no existe en la aplicación.
 * El componente proporciona un botón para redirigir al usuario a la página de inicio de sesión o 
 * al dashboard, dependiendo de si el usuario está autenticado o no.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado-404',
  imports: [],
  templateUrl: './estado-404.html',
  styleUrl: './estado-404.css',
})
export class Estado404 {
  constructor(private router: Router) {}

  redirigirInicio() {
    const idUser = sessionStorage.getItem('id');
    if (idUser) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }
}

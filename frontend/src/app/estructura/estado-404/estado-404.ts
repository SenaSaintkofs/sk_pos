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

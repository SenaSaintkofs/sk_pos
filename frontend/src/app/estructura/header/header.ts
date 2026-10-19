import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private router: Router) {}

  get currentUrl(): string {
    // indica la pagina actual
    const ruta = this.router.url.replace('/', '');
    return ruta.charAt(0).toUpperCase() + ruta.slice(1);
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit{
  rol: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(){
    this.rol = sessionStorage.getItem('rol');
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}

import { Component } from '@angular/core';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import { RouterModule } from '@angular/router';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-main',
  imports: [RouterModule, Header, Nav, Footer], // importa componentes por el template
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}

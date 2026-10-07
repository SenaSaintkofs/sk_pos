import { Component } from '@angular/core';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterModule, RouterLink, Header, Nav],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}

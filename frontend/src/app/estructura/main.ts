import { Component } from '@angular/core';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterModule, Header, Nav],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}

import { Routes } from '@angular/router';

import { Main } from './estructura/main';
import { Login } from './estructura/login/login';
import { Estado404 } from './estructura/estado-404/estado-404';

import { Clientes } from "./modulos/clientes/clientes";
import { DashboardComponent } from "./modulos/dashboard/dashboard";
import { Productos } from "./modulos/productos/productos";
import { Categorias } from './modulos/categorias/categorias';
import { validarUsuarioGuard } from './guardian/validar-usuario-guard';
import { Pedidos } from './modulos/pedidos/pedidos';
import { Usuarios } from './modulos/usuarios/usuarios';

export const routes: Routes = [
    {
        path: 'login', component: Login
    },
    {
        path: '', component: Main,
        children:
        [
            { path: 'dashboard', component: DashboardComponent, canActivate: [validarUsuarioGuard] },
            { path: 'clientes', component: Clientes, canActivate: [validarUsuarioGuard] },
            { path: 'usuarios', component: Usuarios, canActivate: [validarUsuarioGuard] },
            { path: 'productos', component: Productos, canActivate: [validarUsuarioGuard] },
            { path: 'categorias', component: Categorias, canActivate: [validarUsuarioGuard] },
            { path: 'pedidos', component: Pedidos, canActivate: [validarUsuarioGuard]},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    },
    { 
        path: '**', component: Estado404
    }  // comodin 404
];

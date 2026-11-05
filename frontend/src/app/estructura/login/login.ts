/**
 * el servicio de login.ts se encarga de realizar la consulta al servidor para validar el usuario y contraseña.
 * si el usuario es valido se almacena en sessionStorage la información del usuario y se redirige al dashboard.
 * si el usuario no es valido se muestra un mensaje de error.
 * 
 * Para ejemplo se expone un usuario demo con correo
 */

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login as LoginService} from '../../servicios/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  correo: any = 'demo@saintkofs.pw';
  clave: any = '123456';
  error: boolean = false;
  usuario: any;

  constructor(
    private slogin: LoginService,
    private router: Router
  ) { }

  // Validador de envio involuntario
  consultar(tecla: any) {
    if (tecla === 13 || tecla === '') {
      this.slogin.consultar(this.correo, this.clave).subscribe(
        (resultado: any) => {
          this.usuario = resultado;
          
          // Verificar usuario, elementos y validación
          if (this.usuario && this.usuario.length > 0 && this.usuario[0].validar == 'valida') {

            // No Repetir
            const datosUsuario = this.usuario[0];

            sessionStorage.setItem('id', datosUsuario.id_usuario);
            sessionStorage.setItem('correo', this.correo); // Correo del formulario
            sessionStorage.setItem('nombre', datosUsuario.nombre); // corregir concatenador
            sessionStorage.setItem('rol', datosUsuario.rol);

            this.router.navigate(['dashboard']);
          } else {
            this.error = true; // Notificar Error
          }
        },
        (error) => {
          this.error = true; // Otro validador de Error, pero para servidor
        }
      );
    }
  }
}
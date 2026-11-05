// Login.ts es un servicio que se encarga de realizar la consulta al servidor para validar el usuario y contraseña.
// Si el usuario es válido, se almacena en sessionStorage la información del usuario y se redirige al dashboard.
// Si el usuario no es válido, se muestra un mensaje de error.
// Para ejemplo se expone un usuario demo con correo.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private url = `${API_CONFIG.baseUrl}/login.php`;

  constructor(private http: HttpClient){};

  consultar(correo: string, clave: string) {
    const cuerpo = new FormData(); // cambio a Post
    cuerpo.append('correo', correo);
    cuerpo.append('clave', clave);
    // return this.http.post(`${this.url}?email=${correo}&clave=${clave}`);  }
    return this.http.post(this.url, cuerpo);
  }
}

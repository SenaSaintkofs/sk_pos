import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Login {

  url = "http://localhost:8080/controlador/login.php";

  constructor(private http: HttpClient){};

  consultar(correo: string, clave: string) {
    const cuerpo = new FormData(); // cambio a Post
    cuerpo.append('correo', correo);
    cuerpo.append('clave', clave);
    // return this.http.post(`${this.url}?email=${correo}&clave=${clave}`);  }
    return this.http.post(this.url, cuerpo);
  }
}

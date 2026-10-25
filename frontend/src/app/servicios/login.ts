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

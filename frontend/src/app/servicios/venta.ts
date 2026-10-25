import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api';

@Injectable({
  providedIn: 'root',
})
export class Venta {
  private url = `${API_CONFIG.baseUrl}/venta.php`;

  constructor(private http: HttpClient){};

  consulta() {
    return this.http.get(`${this.url}?control=consulta`); 
  }

  insertar(params: any) {
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params)); 
  }

  editar(id: number, params: any) {
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params)); 
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}?control=editar&id=${id}`); 
  }
}

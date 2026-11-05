// servicio CRUD para detalle de pedido
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api';

@Injectable({
  providedIn: 'root', // Esto indica que el servicio estará disponible en toda la aplicación
})

// La clase define un servicio para manejar las operaciones del CRUD de detalle de pedido.
export class DetalleVenta {
  private url = `${API_CONFIG.baseUrl}/detalleVenta.php`;

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
    return this.http.get(`${this.url}?control=eliminar&id=${id}`); 
  }
}

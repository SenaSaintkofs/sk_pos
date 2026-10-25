import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api';

@Injectable({
  providedIn: 'root',
})
export class Pedido {
  private url = `${API_CONFIG.baseUrl}/pedido.php`;
  private urlProducto = `${API_CONFIG.baseUrl}/producto.php`;
  private urlProveedor = `${API_CONFIG.baseUrl}/proveedor.php`;

  constructor(private http: HttpClient) {}

  consulta() {
    return this.http.get(`${this.url}?control=consulta`); 
  }

  // Métodos para llenar los <select> del modal
  consultarProductos() {
    return this.http.get(`${this.urlProducto}?control=consulta`);
  }

  consultarProveedores() {
    return this.http.get(`${this.urlProveedor}?control=consulta`);
  }

  insertar(params: any) {
    return this.http.post(`${this.url}?control=insertar`, params); 
  }

  editar(id: number, params: any) {
    return this.http.post(`${this.url}?control=editar&id=${id}`, params); 
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}?control=eliminar&id=${id}`); 
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Pedido {
  private url = "https://demo-pos.saintkofs/controlador/pedido.php";
  private urlProducto = "http://localhost:8080/controlador/producto.php";
  private urlProveedor = "http://localhost:8080/controlador/proveedor.php";

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
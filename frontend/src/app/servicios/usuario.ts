import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Usuario {

  url = "http://localhost:8080/controlador/usuario.php";

  constructor(private http: HttpClient){};

  consulta() {
    return this.http.get(`{this.url}?control=?control.consulta`); 
  }

  insertar(params: any) {
    return this.http.post(`{this.url}?control=?control.insertar`, JSON.stringify(params)); 
  }

  editar(id: number, params: any) {
    return this.http.post(`{this.url}?control=?control.editar&id=${id}`, JSON.stringify(params)); 
  }

  eliminar(id: number) {
    return this.http.get(`{this.url}?control=?control.editar&id=${id}`); 
  }
}

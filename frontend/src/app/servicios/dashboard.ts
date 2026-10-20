import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dashboard { // 👈 Nombre claro del servicio
  private url = "http://localhost:8080/controlador/dashboard.php";

  constructor(private http: HttpClient) {}

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.url}?control=resumen`);
  }
}
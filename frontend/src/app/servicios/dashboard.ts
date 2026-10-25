import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  private url = "https://demo-pos.saintkofs/controlador/dashboard.php";

  constructor(private http: HttpClient) {}

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.url}?control=resumen`);
  }
}
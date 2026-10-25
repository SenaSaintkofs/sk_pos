import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  private url = `${API_CONFIG.baseUrl}/dashboard.php`;

  constructor(private http: HttpClient) {}

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.url}?control=resumen`);
  }
}
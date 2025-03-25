import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoPrecio } from '../models/historicoPrecio';

@Injectable({
  providedIn: 'root'
})
export class HistoricoPrecioService {
  private API_URL = 'http://localhost:5000/api/historico-precios'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todo el histórico de precios
  obtenerHistorico(): Observable<HistoricoPrecio[]> {
    return this.http.get<HistoricoPrecio[]>(this.API_URL);
  }

  // Obtener el historial de precios por código de barras
  obtenerHistoricoPorCodigo(codigoBarras: string): Observable<HistoricoPrecio[]> {
    return this.http.get<HistoricoPrecio[]>(`${this.API_URL}/${codigoBarras}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private API_URL = 'http://localhost:5000/api/lotes';

  constructor(private http: HttpClient) {}

  // Crear un nuevo lote
  crearLote(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(this.API_URL, lote);
  }

  // Obtener todos los lotes
  obtenerLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.API_URL);
  }

  // Obtener lotes por código de barras
  obtenerLotesPorCodigoBarras(codigoBarras: string): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.API_URL}/${codigoBarras}`);
  }
}

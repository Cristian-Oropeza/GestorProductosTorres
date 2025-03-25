import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tamanio } from '../models/tamanio';

@Injectable({
  providedIn: 'root'
})
export class TamanioService {
  private apiUrl = 'http://localhost:5000/api/tamanios';

  constructor(private http: HttpClient) {}

  getTamanios(): Observable<Tamanio[]> {
    return this.http.get<Tamanio[]>(this.apiUrl);
  }

  getTamanioByDescripcion(descripcion: string): Observable<Tamanio> {
    return this.http.get<Tamanio>(`${this.apiUrl}/${descripcion}`);
  }

  createTamanio(tamanio: Tamanio): Observable<Tamanio> {
    return this.http.post<Tamanio>(this.apiUrl, tamanio);
  }

  updateTamanio(descripcion: string, tamanio: Partial<Tamanio>): Observable<Tamanio> {
    return this.http.put<Tamanio>(`${this.apiUrl}/${descripcion}`, tamanio);
  }

  deleteTamanio(descripcion: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${descripcion}`);
  }
}

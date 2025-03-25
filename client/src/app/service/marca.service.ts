// services/marca.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:5000/api/marcas';

  constructor(private http: HttpClient) {}

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  getMarcaByNombre(nombre: string): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${nombre}`);
  }

  createMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  updateMarca(nombre: string, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${nombre}`, marca);
  }

  deleteMarca(nombre: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${nombre}`);
  }
}

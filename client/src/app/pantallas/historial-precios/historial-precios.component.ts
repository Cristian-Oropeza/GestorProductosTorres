import { Component, OnInit } from '@angular/core';
import { HistoricoPrecioService } from '../../service/historicoPrecio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-precios',
  templateUrl: './historial-precios.component.html',
  styleUrls: ['./historial-precios.component.css']
})
export class HistorialPreciosComponent implements OnInit {
  historialPrecios: any[] = [];

  constructor(
    private historicoPrecioService: HistoricoPrecioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarHistorialPrecios();
  }

  cargarHistorialPrecios() {
    this.historicoPrecioService.obtenerHistorico().subscribe({
      next: (historial) => {
        this.historialPrecios = historial;
        console.log('Historial de precios cargado:', this.historialPrecios);
      },
      error: (error) => {
        console.error('Error al cargar el historial de precios:', error);
      }
    });
  }

  volver() {
    this.router.navigate(['/inicioAlmacenista']);
  }
}
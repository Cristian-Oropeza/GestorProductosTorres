import { Component, OnInit } from '@angular/core';
import { LoteService } from '../../service/lote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-lotes',
  templateUrl: './historial-lotes.component.html',
  styleUrls: ['./historial-lotes.component.css']
})
export class HistorialLotesComponent implements OnInit {
  lotes: any[] = [];

  constructor(
    private loteService: LoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarLotes();
  }

  cargarLotes() {
    this.loteService.obtenerLotes().subscribe({
      next: (lotes) => {
        this.lotes = lotes;
        console.log('Lotes cargados:', this.lotes);
      },
      error: (error) => {
        console.error('Error al cargar lotes:', error);
      }
    });
  }

  volver() {
    this.router.navigate(['/inicioAlmacenista']);
  }
}
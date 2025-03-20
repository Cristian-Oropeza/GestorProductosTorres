import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../service/productoService';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  productoCodigo: string = '';
  producto: any = null;
  mostrarModal: boolean = false;
  cantidadReabastecer: number = 0;
  fechaCaducidad: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productoCodigo = params['codigo'];
      if (this.productoCodigo) {
        this.producto = this.productoService.obtenerProductoPorCodigoBarras(this.productoCodigo);
        if (!this.producto) {
          this.router.navigate(['/inicioAlmacenista']);
        }
      }
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cantidadReabastecer = 0;
    this.fechaCaducidad = '';
  }

  confirmarReabastecimiento() {
    if (this.producto && this.cantidadReabastecer > 0 && this.fechaCaducidad) {
      this.producto.stockAlmacen += this.cantidadReabastecer;
      this.mostrarModal = false;

      this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Stock Actualizado',
          mensaje: `El stock del producto se ha actualizado a ${this.producto.stockAlmacen}.`
        }
      });
    } else {
      this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Error',
          mensaje: 'Debe ingresar una cantidad válida y una fecha de caducidad.'
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/inicioAlmacenista']);
  }
  verHistorialPrecios() {
    if (this.producto) {
      const historial = this.productoService.historicoPrecios.filter(h => h.codigo === this.producto.codigo);
      
      this.dialog.open(DialogMensajeComponent, {
        width: '500px',
        disableClose: false,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Historial de Precios',
          mensaje: historial.length > 0 
            ? historial.map(h => `${h.fechaRegistro}: ${h.precioAnterior} → ${h.nuevoPrecio}`).join('\n')
            : 'No hay cambios de precio registrados.'
        }
      });
    }
  }
  
}
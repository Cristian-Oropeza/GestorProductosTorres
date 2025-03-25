import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../service/producto.service';
import { LoteService } from '../../../service/lote.service'; // Importar LoteService
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';
import { HistoricoPrecioService } from '../../../service/historicoPrecio.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe]
})
export class DetalleProductoComponent implements OnInit {
  productoCodigo: string = '';
  producto: any = null;
  mostrarModal: boolean = false;
  cantidadReabastecer: number = 0;
  fechaCaducidad: string = '';
  lotes: any[] = []; // Declarar la propiedad lotes
  historialPrecios: any[] = []; // Lista de historial de precios
  mostrarHistorialLotes: boolean = false; // Controla si se muestra el historial de lotes
  mostrarHistorialPrecios: boolean = false; // Controla si se muestra el historial de precios
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productoService: ProductoService,
    private loteService: LoteService, // Inyectar LoteService
    private historicoPrecio: HistoricoPrecioService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.productoCodigo = params['codigo'];
      if (this.productoCodigo) {
        try {
          // Obtener el producto
          this.producto = await this.productoService.obtenerProductoPorCodigo(this.productoCodigo);
          if (!this.producto) {
            this.router.navigate(['/inicioAlmacenista']);
          }

          // Obtener los lotes del producto
          this.cargarLotes();

          // Obtener el historial de precios del producto
          this.cargarHistorialPrecios();
        } catch (error) {
          console.error('Error al obtener el producto:', error);
          this.router.navigate(['/inicioAlmacenista']);
        }
      }
    });
    
    
  }

  async cargarHistorialPrecios() {
    try {
      const historial = await this.historicoPrecio.obtenerHistoricoPorCodigo(this.productoCodigo).toPromise();
      this.historialPrecios = historial || []; // Inicializar la propiedad historialPrecios
    } catch (error) {
      console.error('Error al cargar el historial de precios:', error);
    }
  }

  async cargarLotes() {
    try {
      const lotes = await this.loteService.obtenerLotesPorCodigoBarras(this.productoCodigo).toPromise();
      this.lotes = lotes || []; // Inicializar la propiedad lotes
    } catch (error) {
      console.error('Error al cargar los lotes:', error);
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cantidadReabastecer = 0;
    this.fechaCaducidad = '';
  }


  async confirmarReabastecimiento() {
    if (this.producto && this.cantidadReabastecer > 0 && this.fechaCaducidad) {
      try {
        // Actualizar el stock en el producto
        const nuevoStock = this.producto.stock_almacen + this.cantidadReabastecer;
        await this.productoService.actualizarProducto(this.producto.codigo_barras, {
          stock_almacen: nuevoStock
        });
  
        // Registrar el lote
        const nuevoLote = {
          codigo_barras: this.producto.codigo_barras,
          nombre_producto: this.producto.nombre_producto,
          fecha_caducidad: this.fechaCaducidad,
          cantidad: this.cantidadReabastecer
        };
        await this.loteService.crearLote(nuevoLote).toPromise();
  
        // Actualizar el producto localmente
        this.producto.stock_almacen = nuevoStock;
  
        // Recargar los lotes para reflejar el nuevo lote
        await this.cargarLotes(); // <-- Añadir esta línea
  
        // Mostrar mensaje de éxito
        this.dialog.open(DialogMensajeComponent, {
          width: '400px',
          disableClose: true,
          autoFocus: true,
          panelClass: 'custom-dialog-container',
          data: {
            titulo: 'Stock Actualizado',
            mensaje: `El stock del producto se ha actualizado a ${nuevoStock}.`
          }
        });
  
        // Cerrar el modal
        this.cerrarModal();
      } catch (error) {
        console.error('Error al reabastecer:', error);
        this.dialog.open(DialogMensajeComponent, {
          width: '400px',
          disableClose: true,
          autoFocus: true,
          panelClass: 'custom-dialog-container',
          data: {
            titulo: 'Error',
            mensaje: 'Hubo un error al reabastecer el producto.'
          }
        });
      }
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
      this.historicoPrecio.obtenerHistoricoPorCodigo(this.producto.codigo).subscribe(historial => {
        this.dialog.open(DialogMensajeComponent, {
          width: '500px',
          disableClose: false,
          autoFocus: true,
          panelClass: 'custom-dialog-container',
          data: {
            titulo: 'Historial de Precios',
            mensaje: historial.length > 0
              ? historial.map(h => `${h.fecha_registro}: ${h.precio_anterior} → ${h.precio_nuevo}`).join('\n')
              : 'No hay cambios de precio registrados.'
          }
        });
      }, error => {
        this.dialog.open(DialogMensajeComponent, {
          width: '400px',
          disableClose: true,
          autoFocus: true,
          panelClass: 'custom-dialog-container',
          data: {
            titulo: 'Error',
            mensaje: 'No se pudo obtener el historial de precios.'
          }
        });
      });
    }
  }
}
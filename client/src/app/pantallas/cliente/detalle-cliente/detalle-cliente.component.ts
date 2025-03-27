import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../service/producto.service';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';
import { Producto } from '../../../models/producto';
@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.css'
})
export class DetalleClienteComponent {
  productoCodigo: string = ''; // Evita el error de null
  producto: Producto | null = null; // Usamos la interfaz
  mostrarModal: boolean = false;
  cantidadReabastecer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productoService: ProductoService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const codigo = params['codigo']; // Se almacena en una constante

      if (codigo) {
        this.productoCodigo = codigo; // Asigna el código solo si es válido
        try {
          this.producto = await this.productoService.obtenerProductoPorCodigo(this.productoCodigo);
          if (!this.producto) {
            this.router.navigate(['/inicioRepositor']);
          }
        } catch (error) {
          console.error('Error al obtener el producto:', error);
          this.router.navigate(['/inicioRepositor']);
        }
      } else {
        this.router.navigate(['/inicioRepositor']); // Evita que el código sea undefined o null
      }
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cantidadReabastecer = 0;
  }

  async confirmarReabastecimiento() {
    if (!this.producto || this.cantidadReabastecer <= 0) {
      this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Error',
          mensaje: 'Debe ingresar una cantidad válida.'
        }
      });
      return;
    }

    if (this.cantidadReabastecer > this.producto.existencia_almacen) {
      this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Error',
          mensaje: 'La cantidad a reabastecer no puede superar la existencia en almacén.'
        }
      });
      return;
    }

    const nuevaExistenciaAlmacen = this.producto.existencia_almacen - this.cantidadReabastecer;
    const nuevaExistenciaExhibicion = this.producto.existencia_exhibe + this.cantidadReabastecer; // Ajustado a la nomenclatura correcta

    try {
      await this.productoService.actualizarProducto(this.productoCodigo, {
        existencia_almacen: nuevaExistenciaAlmacen,
        existencia_exhibe: nuevaExistenciaExhibicion
      });

      // Actualizar los valores locales
      this.producto.existencia_almacen = nuevaExistenciaAlmacen;
      this.producto.existencia_exhibe = nuevaExistenciaExhibicion;
      this.mostrarModal = false;

      this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Éxito',
          mensaje: `Se movieron ${this.cantidadReabastecer} unidades al estante. 
                    Nueva existencia en estante: ${this.producto.existencia_exhibe}.`
        }
      });
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'custom-dialog-container',
        data: {
          titulo: 'Error',
          mensaje: 'Hubo un error al actualizar el stock. Inténtelo de nuevo.'
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/inicioRepositor']);
  }
}

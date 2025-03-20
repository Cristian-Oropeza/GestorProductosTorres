import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../service/productoService';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-detalle-producto-repositor',
  templateUrl: './detalle-producto-repositor.component.html',
  styleUrls: ['./detalle-producto-repositor.component.css']
})
export class DetalleProductoRepositorComponent implements OnInit {

  productoCodigo: string | null = null;  // Cambio: Código de barras en lugar de id
  producto: any = null;
  mostrarModal: boolean = false;
  cantidadReabastecer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productoService: ProductoService  // Inyectar ProductoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productoCodigo = params.get('codigo');  // Cambiado de id a codigo
      // Obtener el producto desde el servicio usando el código
      this.producto = this.productoService.obtenerProductoPorCodigoBarras(this.productoCodigo as string);
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cantidadReabastecer = 0;
  }

  confirmarReabastecimiento() {
    if (this.producto && this.cantidadReabastecer > 0) {
      if (this.cantidadReabastecer <= this.producto.stockAlmacen) {
        this.producto.stockAlmacen -= this.cantidadReabastecer;
        this.producto.stockEstante += this.cantidadReabastecer;
        this.mostrarModal = false;

        this.dialog.open(DialogMensajeComponent, {
          width: '400px',
          disableClose: true,
          autoFocus: true,
          panelClass: 'custom-dialog-container',
          data: {
            titulo: 'Stock Actualizado',
            mensaje: `Se han movido ${this.cantidadReabastecer} piezas al estante. Stock en estante: ${this.producto.stockEstante}.`
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
            mensaje: 'La cantidad a reabastecer no puede superar el stock en almacén.'
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
          mensaje: 'Debe ingresar una cantidad válida.'
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/inicioRepositor']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';
import { ProductoService } from '../../../service/productoService';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  producto: any = {};  // Producto actual
  precioAnterior: number = 0;  // Precio anterior del producto

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    public dialog: MatDialog,
    private productoService: ProductoService  // Inyectar el servicio
  ) {}

  ngOnInit() {
    const codigoBarras = this.route.snapshot.paramMap.get('codigo');
    if (codigoBarras) {
      this.producto = this.productoService.obtenerProductoPorCodigoBarras(codigoBarras);
    }

    if (!this.producto) {
      console.error(`No se encontró el producto con código de barras: ${codigoBarras}`);
      return;
    }

    this.precioAnterior = this.producto.precioPieza;
  }

  actualizarProducto() {
    if (!this.producto || !this.producto.marca) {
      console.error("Error: El producto o su marca no están definidos.");
      return;
    }

    // Comprobar si el precio ha cambiado
    if (this.producto.precioPieza !== this.precioAnterior) {
      const historico = {
        codigo_barras: this.producto.codigo,  
        nombre_producto: this.producto.nombreProducto,  
        precio_anterior: this.precioAnterior,  
        precio_nuevo: this.producto.precioPieza,  
        fecha_registro: new Date().toISOString()  
      };

      // Agregar el histórico de precios
      this.productoService.agregarHistoricoPrecio(historico);
    }

    // Actualizar el producto en el servicio
    this.productoService.actualizarProducto(this.producto);

    // Mostrar mensaje de éxito
    this.dialog.open(DialogMensajeComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true,
      panelClass: 'custom-dialog-container',
      data: {
        titulo: 'Producto Actualizado',
        mensaje: 'El producto ha sido actualizado exitosamente.'
      }
    }).afterClosed().subscribe(() => {
      this.router.navigate(['/inicioAlmacenista']);  // Redirigir a la pantalla principal del almacenista
    });
  }

  cancelar() {
    this.router.navigate(['/inicioAlmacenista']);  // Redirigir si el usuario cancela la actualización
  }
  
}

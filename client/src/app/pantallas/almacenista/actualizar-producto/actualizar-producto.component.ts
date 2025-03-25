import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';
import { ProductoService } from '../../../service/producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
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

  async ngOnInit() {
    const codigo_barras = this.route.snapshot.paramMap.get('codigo');
    if (!codigo_barras) {
      console.error('Código de barras no proporcionado en la URL.');
      return;
    }

    try {
      this.producto = await this.productoService.obtenerProductoPorCodigo(codigo_barras);
      if (!this.producto) {
        console.error(`No se encontró el producto con código de barras: ${codigo_barras}`);
        return;
      }
      this.precioAnterior = this.producto.precio_pieza;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  }

  async actualizarProducto() {
    if (!this.producto || !this.producto.marca) {
      console.error("Error: El producto o su marca no están definidos.");
      return;
    }

    try {
      // Solo se envían los campos permitidos a actualizar
      await this.productoService.actualizarProducto(this.producto.codigo_barras, {
        precio_pieza: this.producto.precio_pieza,
        imagen: this.producto.imagen
      });

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

    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  }

  cancelar() {
    this.router.navigate(['/inicioAlmacenista']);  // Redirigir si el usuario cancela la actualización
  }
}

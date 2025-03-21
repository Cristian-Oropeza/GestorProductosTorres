import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';
import { ProductoService } from '../../../service/productoService';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css']
})
export class AddProductosComponent {
  producto = {
    codigo: '',
    nombreProducto: '',
    marca: '',
    tamano: '',
    proveedores: [] as string[],
    precioPieza: 0,
    precioCaja: 0,
    piezasCaja: 0,
    imagen: '',
    existencia_exhibe: 0,
    stock_exhibe: 0,
    existencia_almacen: 0,
    stock_almacen: 0
  };

  marcas = ['Marca A', 'Marca B', 'Marca C'];
  tamanos = ['Pequeño', 'Mediano', 'Grande'];
  proveedores = ['Proveedor X', 'Proveedor Y', 'Proveedor Z'];

  selectedProveedor: string = '';
  selectedMarca: string = '';

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private productoService: ProductoService
  ) {}

  addProveedor() {
    if (this.selectedProveedor && !this.producto.proveedores.includes(this.selectedProveedor)) {
      this.producto.proveedores.push(this.selectedProveedor);
      this.selectedProveedor = '';
    }
  }

  removeProveedor(proveedor: string) {
    this.producto.proveedores = this.producto.proveedores.filter(p => p !== proveedor);
  }

  guardarProducto(): void {
    // Validar que existencia no sea menor que stock
    if (
      this.producto.existencia_exhibe < this.producto.stock_exhibe ||
      this.producto.existencia_almacen < this.producto.stock_almacen
    ) {
      // Abrir el diálogo de advertencia
      const dialogRef = this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        data: {
          titulo: 'Advertencia',
          mensaje: 'La existencia no puede ser menor que el stock.',
          mostrarCancelar: false // No necesitamos el botón Cancelar en este caso
        }
      });
  
      dialogRef.afterClosed().subscribe(() => {
        console.log('El usuario cerró el diálogo de advertencia.');
      });
      return; // Detener la ejecución si la validación falla
    }
  
    // Asignar la marca seleccionada antes de guardar
    this.producto.marca = this.selectedMarca;
  
    // Guardar el producto en el servicio
    this.productoService.productos.push({ ...this.producto });
  
    // Mostrar diálogo de éxito
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      width: '400px',
      data: {
        titulo: 'Producto Registrado',
        mensaje: 'El producto ha sido registrado exitosamente.'
      }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['inicioAlmacenista']);
    });
  }

  cancelar() {
    this.router.navigate(['inicioAlmacenista']);
  }
}

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
    marca: '',  // Ahora es un string en lugar de un array
    tamano: '',
    proveedores: [] as string[],
    precioPieza: 0,
    precioCaja: 0,
    piezasCaja: 0,
    stockAlmacen: 0,
    imagen: ''
  };

  marcas = ['Marca A', 'Marca B', 'Marca C'];
  tamanos = ['Pequeño', 'Mediano', 'Grande'];
  proveedores = ['Proveedor X', 'Proveedor Y', 'Proveedor Z'];

  selectedProveedor: string = '';
  selectedMarca: string = ''; // Ahora solo selecciona una marca

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

  guardarProducto() {
    if (!this.producto.codigo.trim() || !this.producto.nombreProducto.trim()) {
      alert('Código de barras y nombre del producto son obligatorios.');
      return;
    }

    // Asignar la marca seleccionada antes de guardar
    this.producto.marca = this.selectedMarca;

    this.productoService.productos.push({ ...this.producto });

    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true,
      panelClass: 'custom-dialog-container',
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

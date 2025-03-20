import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/productoService';
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-inicio-almacenista',
  templateUrl: './inicio-almacenista.component.html',
  styleUrls: ['./inicio-almacenista.component.css']
})
export class InicioAlmacenistaComponent implements OnInit {
  searchQuery: string = '';
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productos = this.productoService.obtenerProductos();
    this.productosFiltrados = [...this.productos];
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      producto.codigo.includes(this.searchQuery)
    );
  }

  navigateToAgregar() {
    this.router.navigate(['/addProducto']);
  }

  verDetalleProducto(codigo: string) {
    if (codigo) {
      this.router.navigate(['/detalleProducto', codigo]);
    }
  }

  actualizarProducto(codigo: string) {
    if (codigo) {
      this.router.navigate(['/actualizarProducto', codigo]);
    }
  }

  eliminarProducto(codigo: string) {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true,
      panelClass: 'custom-dialog-container',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: '¿Estás seguro de que deseas eliminar este producto?',
        mostrarCancelar: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productos = this.productos.filter(producto => producto.codigo !== codigo);
        this.productosFiltrados = this.productos;
        console.log(`Producto con código ${codigo} eliminado.`);
      }
    });
  }

  salir() {
    this.router.navigate(['/']);
  }
}
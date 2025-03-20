import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/productoService'; // Importar ProductoService
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-inicio-repositor',
  templateUrl: './inicio-repositor.component.html',
  styleUrls: ['./inicio-repositor.component.css']
})
export class InicioRepositorComponent implements OnInit {

  searchQuery: string = '';
  productos: any[] = [];  // Arreglo vacío para los productos
  productosFiltrados: any[] = [];  // Productos filtrados según la búsqueda

  constructor(
    private router: Router,
    private productoService: ProductoService,  // Inyectar ProductoService
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productos = this.productoService.obtenerProductos();  // Obtener productos desde el servicio
    this.productosFiltrados = [...this.productos];  // Inicializamos los productos filtrados con todos los productos
  }

  // Filtrar productos por nombre o código
  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      producto.codigo.includes(this.searchQuery)  // Filtrar por código de barras
    );
  }

  // Navegar al detalle del producto usando su código
  verDetalleProducto(codigo: string) {
    this.router.navigate(['/detalleProductoRepositor', codigo]);  // Redirigir usando el código
  }

  actualizarProducto(codigo: string) {
    console.log(`Actualizar producto con código: ${codigo}`);
    this.router.navigate(['/actualizarProducto', codigo]);  // Redirigir a la página de actualización
  }

  salir() {
    this.router.navigate([' ']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoService } from '../../../service/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';
import { Producto } from '../../../models/producto';
import { ProveedorService } from '../../../service/proveedor.service'; // Importar ProveedorService
import { MarcaService } from '../../../service/marca.service'; // Importar MarcaService
import { Proveedor } from '../../../models/proveedor';
import { Marca } from '../../../models/marca';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-inicio-almacenista',
  templateUrl: './inicio-almacenista.component.html',
  styleUrls: ['./inicio-almacenista.component.css']
})
export class InicioAlmacenistaComponent implements OnInit {
  searchQuery: string = ''; // Para la búsqueda básica
  productos: Producto[] = []; // Lista completa de productos
  productosFiltrados: Producto[] = []; // Lista de productos filtrados
  mostrarFiltroAvanzado: boolean = false; // Controla si se muestra el filtro avanzado
  filtroProveedor: string = ''; // Filtro por proveedor
  filtroMarca: string = ''; // Filtro por marca
  proveedores: Proveedor[] = [];
  marcas: Marca[] = [];

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private proveedorService: ProveedorService, // Inyectar ProveedorService
    private marcaService: MarcaService, // Inyectar MarcaService
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.inicializarDatos();
  }
  
  inicializarDatos() {
    this.cargarProductos();
    this.cargarProveedores();
    this.cargarMarcas();
    
    // Reiniciar filtros
    this.filtroProveedor = '';
    this.filtroMarca = '';
    this.searchQuery = '';
  }
  // Cargar todos los productos
  async cargarProductos() {
    try {
      this.productos = await this.productoService.obtenerProductos();
      this.productosFiltrados = [...this.productos];
      console.log('Productos cargados:', this.productos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  // Cargar proveedores
  cargarProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores;
        console.log('Proveedores cargados:', proveedores);
        console.log('Primer proveedor:', proveedores[0]); // Muestra la estructura del primer proveedor
      },
      error: (error) => console.error('Error al cargar proveedores:', error)
    });
  }

  cargarMarcas() {
    this.marcaService.getMarcas().subscribe({
      next: (marcas) => {
        this.marcas = marcas;
        console.log('Marcas cargadas:', marcas);
        console.log('Primera marca:', marcas[0]); // Muestra la estructura de la primera marca
      },
      error: (error) => console.error('Error al cargar marcas:', error)
    });
  }

  // Mostrar/ocultar el filtro avanzado
  toggleFiltroAvanzado() {
    this.mostrarFiltroAvanzado = !this.mostrarFiltroAvanzado;
  }

  // Aplicar el filtro avanzado
  aplicarFiltroAvanzado() {
    this.productosFiltrados = this.productos.filter(producto => {
      const coincideProveedor = !this.filtroProveedor || 
        (producto.proveedores && producto.proveedores.some(
          proveedor => proveedor === this.filtroProveedor
        ));
      
      const coincideMarca = !this.filtroMarca || 
        producto.marca === this.filtroMarca;
      
      return coincideProveedor && coincideMarca;
    });
  }
  
  filtrarProductos() {
    if (!this.searchQuery) {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(producto =>
        producto.nombre_producto.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        producto.codigo_barras.includes(this.searchQuery)
      );
    }
    
    // Re-apply advanced filters after basic search
    if (this.filtroProveedor || this.filtroMarca) {
      this.aplicarFiltroAvanzado();
    }
  }

  mostrarMenu: boolean = false; // Controla si el menú está visible

  // Método para alternar la visibilidad del menú
  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
  
  // Navegar a la pantalla de agregar producto
  navigateToAgregar() {
    this.router.navigate(['/addProducto']);
  }
  // Método para ver el historial de precios
verHistorialPrecios() {
  this.router.navigate(['/historial-precios']);
}

// Método para ver el historial de lotes
verHistorialLotes() {
  this.router.navigate(['/historial-lotes']);
}

  // Ver detalle de un producto
  verDetalleProducto(codigo: string) {
    if (codigo) {
      this.router.navigate(['/detalleProducto', codigo]);
    }
  }

  // Actualizar un producto
  actualizarProducto(codigo: string) {
    if (codigo) {
      this.router.navigate(['/actualizarProducto', codigo]);
    }
  }

  // Eliminar un producto
  async eliminarProducto(codigo: string) {
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

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.productoService.eliminarProducto(codigo);
          this.productos = this.productos.filter(producto => producto.codigo_barras !== codigo);
          this.productosFiltrados = this.productosFiltrados.filter(producto => producto.codigo_barras !== codigo);
          console.log(`Producto con código ${codigo} eliminado.`);
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      }
    });
  }

  // Salir de la aplicación
  salir() {
    this.router.navigate(['/']);
  }
}
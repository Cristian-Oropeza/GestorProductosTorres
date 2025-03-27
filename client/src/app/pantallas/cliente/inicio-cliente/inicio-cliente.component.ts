import { Component } from '@angular/core'; 
 import { OnInit } from '@angular/core';
  import { Router } from '@angular/router';
import { ProductoService } from '../../../service/producto.service';  
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';  
import { Producto } from '../../../models/producto';
  import { ProveedorService } from '../../../service/proveedor.service'; // Importar ProveedorService
  import { MarcaService } from '../../../service/marca.service'; // Importar MarcaService
  import { Proveedor } from '../../../models/proveedor';
  import { Marca } from '../../../models/marca';
  @Component({
    selector: 'app-inicio-cliente',
    templateUrl: './inicio-cliente.component.html',
    styleUrl: './inicio-cliente.component.css'
  })
  export class InicioClienteComponent {
    
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
    

    // Ver detalle de un producto
    verDetalleProductoC(codigo: string) {
      if (codigo) {
        this.router.navigate(['/detalleCliente', codigo]);
      }
    }
  

    // Salir de la aplicación
    salir() {
      this.router.navigate(['/']);
    }
  }
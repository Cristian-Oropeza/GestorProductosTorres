import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogMensajeComponent } from '../../dialog-mensaje/dialog-mensaje.component';

import { ProductoService } from '../../../service/producto.service';
import { MarcaService } from '../../../service/marca.service';
import { TamanioService } from '../../../service/tamanio.service';
import { ProveedorService } from '../../../service/proveedor.service'; 
import { CreateProductoDTO } from '../../../models/producto';

import { Marca } from '../../../models/marca';
import { Tamanio } from '../../../models/tamanio';
import { Proveedor } from '../../../models/proveedor';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule]
})
export class AddProductosComponent implements OnInit {
  producto: CreateProductoDTO = {
    codigo_barras: '',
    nombre_producto: '',
    marca: '',
    tamano: '',
    proveedores: [],
    precio_pieza: 0,
    precio_caja: 0,
    piezas_caja: 0,
    imagen: '',
    existencia_exhibe: 0,
    stock_exhibe: 0,
    existencia_almacen: 0,
    stock_almacen: 0
  };

  marcas: Marca[] = [];
  tamanos: Tamanio[] = [];
  proveedores: string[] = [];
  selectedProveedor: string = '';
  selectedMarca: string = '';
  selectedTamano: Tamanio | null = null;

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private tamanioService: TamanioService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit() {
    this.cargarMarcas();
    this.cargarTamanios();
    this.cargarProveedores();
  }

  private cargarMarcas() {
    this.marcaService.getMarcas().subscribe({
      next: (marcas) => {
        this.marcas = marcas;
        console.log('Marcas cargadas:', this.marcas);
      },
      error: (error) => {
        console.error('Error al cargar marcas:', error);
        this.mostrarError('No se pudieron cargar las marcas');
      }
    });
  }

  private cargarTamanios() {
    this.tamanioService.getTamanios().subscribe({
      next: (tamanios) => {
        this.tamanos = tamanios;
        console.log('Tamaños cargados:', this.tamanos);
      },
      error: (error) => {
        console.error('Error al cargar tamaños:', error);
        this.mostrarError('No se pudieron cargar los tamaños');
      }
    });
  }

  private cargarProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores: Proveedor[]) => {
        this.proveedores = proveedores.map(proveedor => proveedor.nombre_proveedor);
      },
      error: (error) => {
        console.error('Error al cargar proveedores:', error);
        this.mostrarError('No se pudieron cargar los proveedores');
      }
    });
  }

  private mostrarError(mensaje: string) {
    this.dialog.open(DialogMensajeComponent, {
      width: '400px',
      data: {
        titulo: 'Error',
        mensaje: mensaje + '. Por favor, intente nuevamente.'
      }
    });
  }

  addProveedor() {
    if (this.selectedProveedor && !this.producto.proveedores.includes(this.selectedProveedor)) {
      this.producto.proveedores.push(this.selectedProveedor);
      this.selectedProveedor = '';
    }
  }

  removeProveedor(proveedor: string) {
    this.producto.proveedores = this.producto.proveedores.filter(p => p !== proveedor);
  }

  async guardarProducto(): Promise<void> {
    if (!this.selectedTamano) {
      this.mostrarError('Debe seleccionar un tamaño');
      return;
    }

    if (
      this.producto.existencia_exhibe < this.producto.stock_exhibe ||
      this.producto.existencia_almacen < this.producto.stock_almacen
    ) {
      const dialogRef = this.dialog.open(DialogMensajeComponent, {
        width: '400px',
        data: {
          titulo: 'Advertencia',
          mensaje: 'La existencia no puede ser menor que el stock.',
          mostrarCancelar: false
        }
      });
    
      dialogRef.afterClosed().subscribe(() => {
        console.log('El usuario cerró el diálogo de advertencia.');
      });
      return;
    }
    
    this.producto.marca = this.selectedMarca;
    this.producto.tamano = this.selectedTamano.descripcion;
    
    try {
      await this.productoService.crearProducto(this.producto);
    
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
    } catch (error) {
      this.mostrarError('Hubo un error al guardar el producto');
    }
  }

  cancelar() {
    this.router.navigate(['inicioAlmacenista']);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos = [
    { codigo: '123456', nombreProducto: 'Mazapan', marca: 'De la rosa', tamano: '200g', precioPieza: 10, piezasCaja: 20, precioCaja: 50, stockAlmacen: 100, proveedores: ['Lala'], imagen: 'https://www.costco.com.mx/medias/sys_master/products/h13/h05/70367362285598.jpg' },
    { codigo: '789101', nombreProducto: 'Coca cola', marca: 'Coca-Cola', tamano: '1L', precioPieza: 20, piezasCaja: 20, precioCaja: 100, stockAlmacen: 200, proveedores: ['Pepsi', 'Fanta'], imagen: 'https://cdn.milenio.com/uploads/media/2019/06/10/coca-cola-mantenido-respetuosa-esencia_74_0_1125_700.jpg' }
  ];

  historicoPrecios: any[] = [];

  obtenerProductos() {
    return this.productos;
  }

  obtenerProductoPorCodigoBarras(codigoBarras: string) {
    return this.productos.find(p => p.codigo === codigoBarras);
  }

  actualizarProducto(producto: any) {
    const index = this.productos.findIndex(p => p.codigo === producto.codigo);
    if (index !== -1) {
      this.productos[index] = { ...producto };
    }
  }

  actualizarPrecioProducto(codigo: string, nuevoPrecio: number) {
    const producto = this.productos.find(p => p.codigo === codigo);
    
    if (producto) {
      const precioAnterior = producto.precioPieza;
      producto.precioPieza = nuevoPrecio;
  
      this.historicoPrecios.push({
        codigo: producto.codigo,
        nombre: producto.nombreProducto,
        precioAnterior: precioAnterior,
        nuevoPrecio: nuevoPrecio,
        fechaRegistro: new Date().toISOString()  // Usar ISO para formato estándar
      });
  
      console.log("Historial de Precios actualizado:", this.historicoPrecios);
    }
  }

  

  agregarHistoricoPrecio(historico: any) {
    if (!this.historicoPrecios) {
      this.historicoPrecios = [];  // Asegurar que el array existe
    }
  
    this.historicoPrecios.push(historico);
    console.log("Historial después de agregar:", this.historicoPrecios); // 🔍 Verificar que se almacena bien
  }
  
}
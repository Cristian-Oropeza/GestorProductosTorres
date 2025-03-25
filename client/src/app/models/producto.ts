export interface Producto {
    codigo_barras: string;
    nombre_producto: string;
    marca: string;
    tamano: string;
    precio_pieza: number;
    precio_caja: number;
    piezas_caja: number;
    proveedores: string[];
    imagen: string;
    existencia_exhibe: number;
    stock_exhibe: number;
    existencia_almacen: number;
    stock_almacen: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateProductoDTO {
    codigo_barras: string;
    nombre_producto: string;
    marca: string;
    tamano: string;
    precio_pieza: number;
    precio_caja: number;
    piezas_caja: number;
    proveedores: string[];
    imagen: string;
    existencia_exhibe: number;
    stock_exhibe: number;
    existencia_almacen: number;
    stock_almacen: number;
  }
  
  export interface TransferirStockRequest {
    cantidad: number;
  }
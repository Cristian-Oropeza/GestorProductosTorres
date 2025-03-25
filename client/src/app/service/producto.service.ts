import { Injectable } from '@angular/core';
import axios from 'axios';
import { Producto, TransferirStockRequest } from '../models/producto';

const API_URL = 'http://localhost:5000/api/productos'; // Adjust this to match your backend URL

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  // Obtener todos los productos
  async obtenerProductos(): Promise<Producto[]> {
    try {
      const response = await axios.get<Producto[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  }

  // Obtener producto por código de barras
  async obtenerProductoPorCodigo(codigo_barras: string): Promise<Producto> {
    try {
      const response = await axios.get<Producto>(`${API_URL}/${codigo_barras}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  }

  // Crear nuevo producto
  async crearProducto(producto: Producto): Promise<Producto> {
    try {
      const response = await axios.post<Producto>(API_URL, producto);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  // Actualizar producto
  async actualizarProducto(codigo_barras: string, producto: Partial<Producto>): Promise<Producto> {
    try {
      const response = await axios.put<Producto>(`${API_URL}/${codigo_barras}`, producto);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  // Eliminar producto
  async eliminarProducto(codigo_barras: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${codigo_barras}`);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }

  // Transferir stock
  async transferirStock(codigo_barras: string, data: TransferirStockRequest): Promise<Producto> {
    try {
      const response = await axios.put<Producto>(
        `${API_URL}/transferir-stock/${codigo_barras}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error al transferir stock:', error);
      throw error;
    }
  }

  // Buscar productos por marca
  async obtenerProductosPorMarca(marca: string): Promise<Producto[]> {
    try {
      const response = await axios.get<Producto[]>(`${API_URL}/marca/${marca}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos por marca:', error);
      throw error;
    }
  }

  // Buscar productos por proveedor
  async obtenerProductosPorProveedor(proveedor: string): Promise<Producto[]> {
    try {
      const response = await axios.get<Producto[]>(`${API_URL}/proveedor/${proveedor}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos por proveedor:', error);
      throw error;
    }
  }

  // Buscar productos por nombre
  async buscarProductosPorNombre(nombre_producto: string): Promise<Producto[]> {
    try {
      const response = await axios.get<Producto[]>(`${API_URL}/buscar/${nombre_producto}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar productos por nombre:', error);
      throw error;
    }
  }
}
export interface Lote {
    codigo_barras: string;
    nombre_producto: string;
    fecha_caducidad: string; // Se maneja como string para facilitar la conversión
    cantidad: number;
  }
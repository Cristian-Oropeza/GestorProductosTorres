const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
  codigo_barras: {
    type: String,
    required: true,
    unique: true
  },
  nombre_producto: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  tamano: {
    type: String,
    required: true
  },
  precio_pieza: {
    type: Number,
    required: true,
    default: 0
  },
  precio_caja: {
    type: Number,
    required: true,
    default: 0
  },
  piezas_caja: {
    type: Number,
    required: true,
    default: 0
  },
  proveedores: {
    type: [String],
    default: []
  },
  imagen: {
    type: String,
    default: ''
  },
  existencia_exhibe: {
    type: Number,
    default: 0,
    required: true
  },
  stock_exhibe: {
    type: Number,
    default: 0,
    required: true
  },
  existencia_almacen: {
    type: Number,
    default: 0,
    required: true
  },
  stock_almacen: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
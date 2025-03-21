const mongoose = require('mongoose');

const historicoPrecioSchema = mongoose.Schema({
  codigo_barras: {
    type: String,
    required: true,
    ref: 'Producto'
  },
  nombre_producto: {
    type: String,
    required: true
  },
  precio_anterior: {
    type: Number,
    required: true
  },
  precio_nuevo: {
    type: Number,
    required: true
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HistoricoPrecio', historicoPrecioSchema);
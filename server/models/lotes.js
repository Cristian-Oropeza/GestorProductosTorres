// models/loteModel.js
const mongoose = require('mongoose');

const loteSchema = mongoose.Schema({
  codigo_barras: {
    type: String,
    required: true
  },
  nombre_producto: {
    type: String,
    required: true
  },
  fecha_caducidad: {
    type: Date,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lote', loteSchema);
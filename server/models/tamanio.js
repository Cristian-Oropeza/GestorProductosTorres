const mongoose = require('mongoose');

const tamanioSchema = mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tamanio', tamanioSchema);
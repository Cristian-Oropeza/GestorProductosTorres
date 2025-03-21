const mongoose = require('mongoose');

const marcaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Marca', marcaSchema);
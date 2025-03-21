const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema({
  nombre_proveedor: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: [String],
    default: []
  },
  pagina_web: {
    type: String,
    default: ''
  },
  correo: {
    type: String,
    default: ''
  },
  domicilio: {
    calle: {
      type: String,
      default: ''
    },
    numero_interior: {
      type: String,
      default: ''
    },
    numero_exterior: {
      type: String,
      default: ''
    },
    colonia: {
      type: String,
      default: 'Centro'
    },
    codigo_postal: {
      type: String,
      default: ''
    },
    ciudad: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
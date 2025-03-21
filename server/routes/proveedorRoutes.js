const express = require('express');
const router = express.Router();
const {
  getProveedores,
  getProveedorByNombre,
  createProveedor,
  updateProveedor,
  deleteProveedor
} = require('../controllers/proveedorController');

// Rutas para proveedores
router.route('/')
  .get(getProveedores)
  .post(createProveedor);

router.route('/:nombre')
  .get(getProveedorByNombre)
  .put(updateProveedor)
  .delete(deleteProveedor);

module.exports = router;
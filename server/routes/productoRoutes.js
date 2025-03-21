const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoByCodigoBarras,
  createProducto,
  updateProducto,
  deleteProducto,
  transferirStock
} = require('../controllers/productoController');

// Rutas para productos
router.route('/')
  .get(getProductos)
  .post(createProducto);

router.route('/:codigo_barras')
  .get(getProductoByCodigoBarras)
  .put(updateProducto)
  .delete(deleteProducto);

  // Ruta para transferir stock
router.route('/transferir-stock/:codigo_barras')
.put(transferirStock);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getProductos,
  getProductoByCodigoBarras,
  createProducto,
  updateProducto,
  deleteProducto,
  transferirStock,
  getProductosByMarca,
  getProductosByProveedor,
  buscarProductosPorNombre
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

// Ruta para obtener productos por marca
router.route('/marca/:marca')
  .get(getProductosByMarca);

  // Ruta para obtener productos por proveedor
router.route('/proveedor/:proveedor')
.get(getProductosByProveedor);

// Ruta para buscar productos por nombre
router.route('/buscar/:nombre')
  .get(buscarProductosPorNombre);

module.exports = router;
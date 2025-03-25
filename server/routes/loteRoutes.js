const express = require('express');
const router = express.Router();
const { createLote, getLotes, getLotesByCodigoBarras } = require('../controllers/loteController');

// Ruta para crear un nuevo lote
router.route('/').post(createLote);

// Ruta para obtener todos los lotes
router.route('/').get(getLotes);

// Ruta para obtener lotes por código de barras
router.route('/:codigo_barras').get(getLotesByCodigoBarras);

module.exports = router;

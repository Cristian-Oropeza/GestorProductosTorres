const express = require('express');
const router = express.Router();
const {
  getHistoricoPrecios,
  getHistoricoByCodigoBarras
} = require('../controllers/historicoPrecioController');

// Rutas para histórico de precios
router.route('/')
  .get(getHistoricoPrecios);

router.route('/:codigo_barras')
  .get(getHistoricoByCodigoBarras);

module.exports = router;
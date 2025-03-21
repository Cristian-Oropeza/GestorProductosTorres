const express = require('express');
const router = express.Router();
const {
  getTamanios,
  getTamanioByDescripcion,
  createTamanio,
  updateTamanio,
  deleteTamanio
} = require('../controllers/tamanioController');

// Rutas para tamaños
router.route('/')
  .get(getTamanios)
  .post(createTamanio);

router.route('/:descripcion')
  .get(getTamanioByDescripcion)
  .put(updateTamanio)
  .delete(deleteTamanio);

module.exports = router;
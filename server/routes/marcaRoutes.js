const express = require('express');
const router = express.Router();
const {
  getMarcas,
  getMarcaByNombre,
  createMarca,
  updateMarca,
  deleteMarca
} = require('../controllers/marcaController');

// Rutas para marcas
router.route('/')
  .get(getMarcas)
  .post(createMarca);

router.route('/:nombre')
  .get(getMarcaByNombre)
  .put(updateMarca)
  .delete(deleteMarca);

module.exports = router;
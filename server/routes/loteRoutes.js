// routes/loteRoutes.js
const express = require('express');
const router = express.Router();
const { createLote } = require('../controllers/loteController');

// Ruta para crear un nuevo lote
router.route('/').post(createLote);

module.exports = router;
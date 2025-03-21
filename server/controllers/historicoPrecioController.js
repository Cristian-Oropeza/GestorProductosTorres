const HistoricoPrecio = require('../models/historicoPrecio');

// @desc    Obtener todo el histórico de precios
// @route   GET /api/historico-precios
// @access  Public
const getHistoricoPrecios = async (req, res) => {
  try {
    const historicos = await HistoricoPrecio.find({});
    res.json(historicos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener histórico de precios por código de barras
// @route   GET /api/historico-precios/:codigo_barras
// @access  Public
const getHistoricoByCodigoBarras = async (req, res) => {
  try {
    const historicos = await HistoricoPrecio.find({ codigo_barras: req.params.codigo_barras });
    
    if (historicos.length === 0) {
      return res.status(404).json({ message: 'No hay registros históricos para este producto' });
    }
    
    res.json(historicos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHistoricoPrecios,
  getHistoricoByCodigoBarras
};
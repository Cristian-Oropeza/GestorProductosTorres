// controllers/loteController.js
const Lote = require('../models/lotes');
const Producto = require('../models/producto');

// @desc    Crear un nuevo lote y actualizar el stock en Productos
// @route   POST /api/lotes
// @access  Public
const createLote = async (req, res) => {
  try {
    const { codigo_barras, nombre_producto, fecha_caducidad, cantidad } = req.body;

    // Verificar si el producto existe
    const producto = await Producto.findOne({ codigo_barras });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Crear el nuevo lote
    const nuevoLote = await Lote.create({
      codigo_barras,
      nombre_producto,
      fecha_caducidad,
      cantidad
    });

    // Actualizar el stock en la colección Productos
    producto.stock_almacen += cantidad;
    await producto.save();

    res.status(201).json(nuevoLote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener todos los lotes
// @route   GET /api/lotes
// @access  Public
const getLotes = async (req, res) => {
  try {
    const lotes = await Lote.find();
    res.status(200).json(lotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener lotes por código de barras (producto)
// @route   GET /api/lotes/:codigo_barras
// @access  Public
const getLotesByCodigoBarras = async (req, res) => {
  try {
    const { codigo_barras } = req.params;
    const lotes = await Lote.find({ codigo_barras });

    if (lotes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron lotes para este código de barras' });
    }

    res.status(200).json(lotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createLote,
  getLotes,
  getLotesByCodigoBarras
};

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

module.exports = {
  createLote
};
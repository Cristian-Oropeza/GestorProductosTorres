const Producto = require('../models/producto');
const HistoricoPrecio = require('../models/historicoPrecio');

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Public
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un producto por código de barras
// @route   GET /api/productos/:codigo_barras
// @access  Public
const getProductoByCodigoBarras = async (req, res) => {
  try {
    const producto = await Producto.findOne({ codigo_barras: req.params.codigo_barras });
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Public
const createProducto = async (req, res) => {
  try {
    // Verificar si ya existe un producto con este código de barras
    const productoExistente = await Producto.findOne({ codigo_barras: req.body.codigo_barras });
    
    if (productoExistente) {
      return res.status(400).json({ message: 'Ya existe un producto con este código de barras' });
    }
    
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/productos/:codigo_barras
// @access  Public
const updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({ codigo_barras: req.params.codigo_barras });
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    // Verificar si el precio ha cambiado para registrar en el histórico
    if (req.body.precio_pieza && req.body.precio_pieza !== producto.precio_pieza) {
      await HistoricoPrecio.create({
        codigo_barras: producto.codigo_barras,
        nombre_producto: producto.nombre_producto,
        precio_anterior: producto.precio_pieza,
        precio_nuevo: req.body.precio_pieza,
        fecha_registro: new Date()
      });
    }
    
    // Actualizar producto
    const productoActualizado = await Producto.findOneAndUpdate(
      { codigo_barras: req.params.codigo_barras },
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/productos/:codigo_barras
// @access  Public
const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({ codigo_barras: req.params.codigo_barras });
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    await Producto.deleteOne({ codigo_barras: req.params.codigo_barras });
    
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Transferir stock de almacén a exhibición
// @route   PUT /api/productos/transferir-stock/:codigo_barras
// @access  Public
const transferirStock = async (req, res) => {
  try {
    const { codigo_barras } = req.params;
    const { cantidad } = req.body;

    // Validar que la cantidad sea un número positivo
    if (typeof cantidad !== 'number' || cantidad <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser un número positivo' });
    }

    // Buscar el producto por código de barras
    const producto = await Producto.findOne({ codigo_barras });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si hay suficiente stock en el almacén
    if (producto.stock_almacen < cantidad) {
      return res.status(400).json({ message: 'No hay suficiente stock en el almacén' });
    }

    // Restar la cantidad del stock_almacen y sumarla al stock_exhibe
    producto.stock_almacen -= cantidad;
    producto.stock_exhibe += cantidad;

    // Guardar los cambios en la base de datos
    await producto.save();

    res.json({ message: 'Stock transferido exitosamente', producto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductos,
  getProductoByCodigoBarras,
  createProducto,
  updateProducto,
  deleteProducto,
  transferirStock
};
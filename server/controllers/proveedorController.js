const Proveedor = require('../models/proveedor');

// @desc    Obtener todos los proveedores
// @route   GET /api/proveedores
// @access  Public
const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un proveedor por nombre
// @route   GET /api/proveedores/:nombre
// @access  Public
const getProveedorByNombre = async (req, res) => {
  try {
    // Usamos una expresión regular para hacer la búsqueda insensible a mayúsculas/minúsculas
    const proveedor = await Proveedor.findOne({ 
      nombre_proveedor: new RegExp(`^${req.params.nombre}$`, 'i') 
    });
    
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear un nuevo proveedor
// @route   POST /api/proveedores
// @access  Public
const createProveedor = async (req, res) => {
  try {
    // Verificar si ya existe un proveedor con este nombre
    const proveedorExistente = await Proveedor.findOne({ 
      nombre_proveedor: new RegExp(`^${req.body.nombre_proveedor}$`, 'i')
    });
    
    if (proveedorExistente) {
      return res.status(400).json({ message: 'Ya existe un proveedor con este nombre' });
    }
    
    const proveedor = await Proveedor.create(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar un proveedor
// @route   PUT /api/proveedores/:nombre
// @access  Public
const updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findOne({ 
      nombre_proveedor: new RegExp(`^${req.params.nombre}$`, 'i')
    });
    
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    
    // Actualizar proveedor
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      proveedor._id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar un proveedor
// @route   DELETE /api/proveedores/:nombre
// @access  Public
const deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findOne({ 
      nombre_proveedor: new RegExp(`^${req.params.nombre}$`, 'i')
    });
    
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    
    await Proveedor.findByIdAndDelete(proveedor._id);
    
    res.json({ message: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProveedores,
  getProveedorByNombre,
  createProveedor,
  updateProveedor,
  deleteProveedor
};
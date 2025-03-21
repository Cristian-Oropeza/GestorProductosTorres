const Marca = require('../models/marca');

// @desc    Obtener todas las marcas
// @route   GET /api/marcas
// @access  Public
const getMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find({});
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener una marca por nombre
// @route   GET /api/marcas/:nombre
// @access  Public
const getMarcaByNombre = async (req, res) => {
  try {
    const marca = await Marca.findOne({ 
      nombre: new RegExp(`^${req.params.nombre}$`, 'i') 
    });
    
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    
    res.json(marca);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear una nueva marca
// @route   POST /api/marcas
// @access  Public
const createMarca = async (req, res) => {
  try {
    // Verificar si ya existe una marca con este nombre
    const marcaExistente = await Marca.findOne({ 
      nombre: new RegExp(`^${req.body.nombre}$`, 'i')
    });
    
    if (marcaExistente) {
      return res.status(400).json({ message: 'Ya existe una marca con este nombre' });
    }
    
    const marca = await Marca.create(req.body);
    res.status(201).json(marca);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar una marca
// @route   PUT /api/marcas/:nombre
// @access  Public
const updateMarca = async (req, res) => {
  try {
    const marca = await Marca.findOne({ 
      nombre: new RegExp(`^${req.params.nombre}$`, 'i')
    });
    
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    
    // Actualizar marca
    const marcaActualizada = await Marca.findByIdAndUpdate(
      marca._id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(marcaActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar una marca
// @route   DELETE /api/marcas/:nombre
// @access  Public
const deleteMarca = async (req, res) => {
  try {
    const marca = await Marca.findOne({ 
      nombre: new RegExp(`^${req.params.nombre}$`, 'i')
    });
    
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    
    await Marca.findByIdAndDelete(marca._id);
    
    res.json({ message: 'Marca eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMarcas,
  getMarcaByNombre,
  createMarca,
  updateMarca,
  deleteMarca
};
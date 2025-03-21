const Tamanio = require('../models/tamanio');

// @desc    Obtener todos los tamaños
// @route   GET /api/tamanios
// @access  Public
const getTamanios = async (req, res) => {
  try {
    const tamanios = await Tamanio.find({});
    res.json(tamanios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un tamaño por descripción
// @route   GET /api/tamanios/:descripcion
// @access  Public
const getTamanioByDescripcion = async (req, res) => {
  try {
    const tamanio = await Tamanio.findOne({ 
      descripcion: new RegExp(`^${req.params.descripcion}$`, 'i') 
    });
    
    if (!tamanio) {
      return res.status(404).json({ message: 'Tamaño no encontrado' });
    }
    
    res.json(tamanio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear un nuevo tamaño
// @route   POST /api/tamanios
// @access  Public
const createTamanio = async (req, res) => {
  try {
    // Verificar si ya existe un tamaño con esta descripción
    const tamanioExistente = await Tamanio.findOne({ 
      descripcion: new RegExp(`^${req.body.descripcion}$`, 'i')
    });
    
    if (tamanioExistente) {
      return res.status(400).json({ message: 'Ya existe un tamaño con esta descripción' });
    }
    
    const tamanio = await Tamanio.create(req.body);
    res.status(201).json(tamanio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar un tamaño
// @route   PUT /api/tamanios/:descripcion
// @access  Public
const updateTamanio = async (req, res) => {
  try {
    const tamanio = await Tamanio.findOne({ 
      descripcion: new RegExp(`^${req.params.descripcion}$`, 'i')
    });
    
    if (!tamanio) {
      return res.status(404).json({ message: 'Tamaño no encontrado' });
    }
    
    // Actualizar tamaño
    const tamanioActualizado = await Tamanio.findByIdAndUpdate(
      tamanio._id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(tamanioActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar un tamaño
// @route   DELETE /api/tamanios/:descripcion
// @access  Public
const deleteTamanio = async (req, res) => {
  try {
    const tamanio = await Tamanio.findOne({ 
      descripcion: new RegExp(`^${req.params.descripcion}$`, 'i')
    });
    
    if (!tamanio) {
      return res.status(404).json({ message: 'Tamaño no encontrado' });
    }
    
    await Tamanio.findByIdAndDelete(tamanio._id);
    
    res.json({ message: 'Tamaño eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTamanios,
  getTamanioByDescripcion,
  createTamanio,
  updateTamanio,
  deleteTamanio
};
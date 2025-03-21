const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');

// Rutas
const productoRoutes = require('./routes/productoRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const marcaRoutes = require('./routes/marcaRoutes');
const tamanioRoutes = require('./routes/tamanioRoutes');
const loteRoutes = require('./routes/loteRoutes');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Usar rutas
app.use('/api/productos', productoRoutes);
app.use('/api/historico-precios', historicoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/marcas', marcaRoutes);      
app.use('/api/tamanios', tamanioRoutes);
app.use('/api/lotes', loteRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'API Funcionando' });
});

// Middleware para manejo de errores
app.use(errorHandler);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
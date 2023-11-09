import express from 'express';
import { PORT } from './dictionary-back.js';
import connectDB from './config/db.js';

// Crear app del servidor de express
const app = express();

// Llamar conexión a base de datos
connectDB();

app.listen(PORT, () => console.log(`Aplicación corriendo en el puerto ${PORT}`));
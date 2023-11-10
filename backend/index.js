import express from 'express';
import { PORT } from './dictionary-back.js';
import connectDB from './config/db.js';
import veterinarianRouter from './router/veterinarian.router.js';
import { PATH_API } from './routes/paths.js';

// Crear app del servidor de express
const app = express();

// Habilitar BodyParser
app.use(express.json());

// Llamar conexión a base de datos
connectDB();

// Rutas API
app.use(PATH_API.veterinarians.root, veterinarianRouter);

app.listen(PORT, () =>
  console.log(`Aplicación corriendo en el puerto ${PORT}`)
);

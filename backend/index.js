import express from 'express';
// Dictionary
import { PORT } from './dictionary-back.js';
// Paths
import { PATH_PATIENTS, PATH_VETERINARIAN } from './routes/paths.js';
// DB
import connectDB from './config/db.js';
// Routers
import veterinarianRouter from './router/veterinarian.router.js';
import patientRouter from './router/patient.router.js';

// Crear app del servidor de express
const app = express();

// Habilitar BodyParser
app.use(express.json());

// Llamar conexión a base de datos
connectDB();

// Rutas API
app.use(PATH_VETERINARIAN.root, veterinarianRouter);
app.use(PATH_PATIENTS.root, patientRouter);

app.listen(PORT, () =>
  console.log(`Aplicación corriendo en el puerto ${PORT}`)
);

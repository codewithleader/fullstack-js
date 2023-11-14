import express from 'express';
import cors from 'cors';
// Dictionary
import {
  HOST_FRONTEND_DEV,
  HOST_FRONTEND_PREVIEW,
  PORT,
} from './dictionary-back.js';
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

// Dominios permitidos en poliza de CORS
const allowedWebDomains = [HOST_FRONTEND_DEV, HOST_FRONTEND_PREVIEW];

// Configuración para los CORS: Permitir solo los que esten el el array 'allowebWebDomains'
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedWebDomains.indexOf(origin) === -1) {
      // Bloquear origen del request (Bloquear peticion de un servidor que no sea el de nuestro frontend)
      callback(new Error('No permitido por CORS'));
    } else {
      // El origen del request está permitido
      callback(null, true); // Null seria el error ya que no hay error en este caso y true es permitir acceso
    }
  },
};

// Activar CORS
app.use(cors(corsOptions));

// Rutas API
app.use(PATH_VETERINARIAN.root, veterinarianRouter);
app.use(PATH_PATIENTS.root, patientRouter);

app.listen(PORT, () =>
  console.log(`Aplicación corriendo en el puerto ${PORT}`)
);

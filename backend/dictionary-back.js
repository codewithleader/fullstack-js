// Con esta linea se habilitan las variables de entorno
import 'dotenv/config';

export const PORT = process.env.PORT;
export const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

// Auth
export const JWT_SECRET = process.env.JWT_SECRET;
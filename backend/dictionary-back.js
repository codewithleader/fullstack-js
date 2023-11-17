// Con esta linea se habilitan las variables de entorno
import 'dotenv/config';

export const PORT = process.env.PORT;
export const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

// Auth
export const JWT_SECRET = process.env.JWT_SECRET;

// MAILTRAP
export const MAILTRAP_HOST = process.env.MAILTRAP_HOST;
export const MAILTRAP_PORT = process.env.MAILTRAP_PORT;
export const MAILTRAP_AUTH_USER = process.env.MAILTRAP_AUTH_USER;
export const MAILTRAP_AUTH_PASS = process.env.MAILTRAP_AUTH_PASS;

// FRONTEND data
// export const HOST_FRONTEND_DEV = process.env.HOST_FRONTEND_DEV;
// export const HOST_FRONTEND_PREVIEW = process.env.HOST_FRONTEND_PREVIEW;
export const HOST_FRONTEND_PROD = process.env.HOST_FRONTEND_PROD;
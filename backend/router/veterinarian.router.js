import express from 'express';
import { PATH_API } from '../routes/paths.js';
import { authenticate, profile, register, resetPassword, verify } from '../controllers/veterinarian.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';

const router = express.Router();

/* Todas las rutas comienzan con '/api/veterinarios' */

// Public Area: Authenticate
router.post('/', register);
router.get(PATH_API.veterinarians.verify, verify);
router.post(PATH_API.veterinarians.login, authenticate);
router.post(PATH_API.veterinarians.reset_password, resetPassword);
router.get(PATH_API.veterinarians.new_password, newPassword);
router.post(PATH_API.veterinarians.new_password, newPassword);

// Private Area
router.get(PATH_API.veterinarians.profile, checkAuth, profile);

export default router;

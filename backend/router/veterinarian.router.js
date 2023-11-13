import express from 'express';
import { PATH_VETERINARIAN } from '../routes/paths.js';
import { authenticate, checkToken, newPassword, profile, register, resetPassword, verify } from '../controllers/veterinarian.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';

const router = express.Router();

/* Todas las rutas comienzan con '/api/veterinarios' */

// Public Area: Authenticate
router.post(PATH_VETERINARIAN.veterinarians.root, register);
router.get(PATH_VETERINARIAN.veterinarians.verify, verify);
router.post(PATH_VETERINARIAN.veterinarians.login, authenticate);
router.post(PATH_VETERINARIAN.veterinarians.reset_password, resetPassword);

/* Option #1: */
// router.get(PATH_VETERINARIAN.veterinarians.new_password, checkToken);
// router.post(PATH_VETERINARIAN.veterinarians.new_password, newPassword);

/* Option #2: route simplifica el codigo */
router.route(PATH_VETERINARIAN.veterinarians.new_password).get(checkToken).post(newPassword);

// Private Area
router.get(PATH_VETERINARIAN.veterinarians.profile, checkAuth, profile);

export default router;

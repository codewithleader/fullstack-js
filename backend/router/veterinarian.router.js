import express from 'express';
import { PATH_API } from '../routes/paths.js';
import { authenticate, checkToken, newPassword, profile, register, resetPassword, verify } from '../controllers/veterinarian.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';

const router = express.Router();

/* Todas las rutas comienzan con '/api/veterinarios' */

// Public Area: Authenticate
router.post('/', register);
router.get(PATH_API.veterinarians.verify, verify);
router.post(PATH_API.veterinarians.login, authenticate);
router.post(PATH_API.veterinarians.reset_password, resetPassword);

/* Option #1: */
// router.get(PATH_API.veterinarians.new_password, checkToken);
// router.post(PATH_API.veterinarians.new_password, newPassword);

/* Option #2: route simplifica el codigo */
router.route(PATH_API.veterinarians.new_password).get(checkToken).post(newPassword);

// Private Area
router.get(PATH_API.veterinarians.profile, checkAuth, profile);

export default router;

import express from 'express';
import { PATH_API } from '../routes/paths.js';
import { profile, register, verify } from '../controllers/veterinarian.controller.js';

const router = express.Router();

router.post('/', register);

router.get(PATH_API.veterinarians.profile, profile);
router.get(PATH_API.veterinarians.verify, verify);

export default router;

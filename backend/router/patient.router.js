import express from 'express';
import { addPatient, deletePatient, getPatient, getPatients, updatePatient } from '../controllers/patient.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import { PATH_PATIENTS } from '../routes/paths.js';

const router = express.Router();

/* Todas las rutas comienzan con '/pacientes' */

// All patients
router
  .route(PATH_PATIENTS.patients.root)
  .post(checkAuth, addPatient)
  .get(checkAuth, getPatients);

// A Patient
router
  .route(PATH_PATIENTS.patients.patient)
  .get(checkAuth, getPatient)
  .put(checkAuth, updatePatient) // Put reemplaza el objeto completo, PATCH modifica parcialmente
  .delete(checkAuth, deletePatient);

export default router;

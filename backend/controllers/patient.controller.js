import { request, response } from 'express';
import { isValidObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../dictionary-back.js';
import Patient from '../models/Patient.model.js';

const addPatient = async (req = request, res = response) => {
  const veterinarianID = req.session.user.id;

  const patient = new Patient(req.body);
  patient.veterinarian = veterinarianID;

  try {
    const newPatient = await patient.save();
    return res.json({ msg: 'OK', newPatient });
  } catch (err) {
    console.error(err);
    const error = new Error('contacte al administrador');
    return res.status(500).json({ msg: error.message });
  }
};

const getPatients = async (req, res) => {
  const { user } = req.session;

  // Option #1:
  // const patients = await Patient.find({ veterinarian: user.id });

  // Option #2:
  const patients = await Patient.find().where('veterinarian').equals(user.id);

  return res.json({ msg: 'OK', patients });
};

const getPatient = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const isMongoID = isValidObjectId(id);

  if (!isMongoID) {
    const error = new Error('No es un ID de Mongo válido');
    return res.status(400).json({ msg: error.message });
  }
  // const patient = await Patient.findById(id).where('veterinarian').equals(user.id);
  const patient = await Patient.findById(id);

  if (!patient) {
    const error = new Error('No se encontró un paciente con ese id');
    return res.status(400).json({ msg: error.message });
  }

  if (patient.veterinarian.toString() !== user.id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(403).json({ msg: error.message });
  }

  return res.json({ patient });
};

const updatePatient = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const body = req.body;
  const isMongoID = isValidObjectId(id);

  if (!isMongoID) {
    const error = new Error('No es un ID de Mongo válido');
    return res.status(400).json({ msg: error.message });
  }

  // const patient = await Patient.findById(id).where('veterinarian').equals(user.id);
  const patient = await Patient.findById(id);

  if (!patient) {
    const error = new Error('No se encontró un paciente con ese id');
    return res.status(400).json({ msg: error.message });
  }

  if (patient.veterinarian.toString() !== user.id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(403).json({ msg: error.message });
  }

  // Modificar datos del paciente:
  patient.name = body.name || patient.name;
  patient.owner = body.owner || patient.owner;
  patient.email = body.email || patient.email;
  patient.discharge_date = body.discharge_date || patient.discharge_date;
  patient.symptoms = body.symptoms || patient.symptoms;

  try {
    const patientUpdated = await patient.save();

    return res.json({ patientUpdated });
  } catch (err) {
    console.error(err);
    const error = new Error('Revisar logs del servidor');
    return res.status(500).json({ msg: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const isMongoID = isValidObjectId(id);

  if (!isMongoID) {
    const error = new Error('No es un ID de Mongo válido');
    return res.status(400).json({ msg: error.message });
  }

  const patient = await Patient.findById(id);

  if (!patient) {
    const error = new Error('No se encontró un paciente con ese id');
    return res.status(400).json({ msg: error.message });
  }

  if (patient.veterinarian.toString() !== user.id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(403).json({ msg: error.message });
  }

  try {
    const { acknowledged, deletedCount } = await patient.deleteOne();

    return res.json({
      msg: 'Paciente eliminado de base de datos',
      acknowledged,
      deletedCount,
    });
  } catch (err) {
    console.error(err);
    const error = new Error('Revisar logs del servidor');
    return res.status(500).json({ msg: error.message });
  }
};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };

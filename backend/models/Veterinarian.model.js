import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//
import generateToken from '../helpers/generateToken.js';

const veterinarianSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Elimina los espacios en blanco antes de insertar en DB
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generateToken(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// Realizar acciones antes de guardar en DB (Por ejemplo: Hashear el password):
veterinarianSchema.pre('save', async function (next) {
  // ? Nota Importante: No se puede usar arrow function en este caso porque se usará "this" y this hace referencia al ventana global window en un arrow function, mientras que en una funcion tradicional "this" representa el objeto actual. Mosca con los arrow functions.

  // Prevenir que se hashee multiples veces, si ya el password está hasheado no lo volverá a hashear.
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

export default Veterinarian;

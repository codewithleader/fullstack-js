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

/* ----------------------------------------------------------------- */
/* ----- Metodos adicionales que le queramos agregar al Schema ----- */
/* ----------------------------------------------------------------- */
// Realizar acciones antes de guardar en DB (Por ejemplo: Hashear el password):
veterinarianSchema.pre('save', async function (next) {
  // ? Nota Importante: No se puede usar arrow function en este caso porque se usará "this" y this hace referencia al ventana global window en un arrow function, mientras que en una funcion tradicional "this" representa el objeto actual. Mosca con los arrow functions.

  // Prevenir que se hashee multiples veces, si ya el password está hasheado no lo volverá a hashear.
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Es preferible hash que hashSync para no bloquear la app.
});

// Method #1: Check Password: Verifica que la contraseña que ingresó el usuario haga match con el password hasheado en una instancia de 'veterinarian'
veterinarianSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password); // return boolean
};

// Method #2: Quitar propiedades cuando llamamos la funcion .json() al momento de enviar el objeto al frontend. Por ejemplo: No queremos que el frontend vea el password hasheado asi que lo quitamos.
/* The `veterinarianSchema.methods.toJSON` function is a method that is added to the schema to modify
the behavior of the `toJSON` function when called on a veterinarian object. */
veterinarianSchema.methods.toJSON = function () {
  // Desestructuramos lo que no queremos que se envíe al frontend
  const { __v, password, _id, verified, ...restObject } = this.toObject();

  // Creamos una propiedad id y le asignamos el valor de _id.
  restObject.id = _id;

  // Se devuelven el objeto con el resto de las propiedades.
  return restObject;
};

// El nombre que está en el primer argumento del metodo .model() entre comillas simples es el nombre del modelo para las referencias (ref)
const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

export default Veterinarian;

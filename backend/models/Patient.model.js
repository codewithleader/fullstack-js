import mongoose from 'mongoose';

const patientsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    discharge_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    symptoms: {
      type: String,
      required: true,
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinarian',
      required: true,
    },
  },
  { timestamps: true }
);

/* ----------------------------------------------------------------- */
/* ----- Metodos adicionales que le queramos agregar al Schema ----- */
/* ----------------------------------------------------------------- */

// Method #1: Quitar propiedades cuando llamamos la funcion .json() al momento de enviar el objeto al frontend. Por ejemplo: No queremos que el frontend vea el password hasheado asi que lo quitamos.
/* The `veterinarianSchema.methods.toJSON` function is a method that is added to the schema to modify
the behavior of the `toJSON` function when called on a veterinarian object. */
patientsSchema.methods.toJSON = function () {
  // Desestructuramos lo que no queremos que se envíe al frontend
  const { __v, _id, ...restObject } = this.toObject();

  // Creamos una propiedad id y le asignamos el valor de _id.
  restObject.id = _id;

  // Se devuelven el objeto con el resto de las propiedades.
  return restObject;
};

const Patient = mongoose.model('Patient', patientsSchema);

export default Patient;

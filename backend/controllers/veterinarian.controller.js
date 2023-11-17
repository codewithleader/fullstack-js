import bcrypt from 'bcrypt';
import Veterinarian from '../models/Veterinarian.model.js';
import generateJWT from '../helpers/generateJWT.js';
import generateToken from '../helpers/generateToken.js';
import emailRegister from '../helpers/emailRegister.js';
import emailResetPassword from '../helpers/emailResetPassword.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Prevenir usuarios duplicados (email)
    const userExists = await Veterinarian.findOne({ email });

    if (userExists) {
      const error = new Error(
        `Usuario registrado. El email '${email}' ya está registrado en la base de datos`
      );

      return res.status(400).json({
        msg: error.message,
      });
    }

    // Crear un nuevo veterinario
    const veterinarian = new Veterinarian(req.body);
    const veterinarianSaved = await veterinarian.save();

    // Enviar email
    await emailRegister({
      email,
      name,
      token: veterinarianSaved.token,
      hostFrontend: req.get('Origin') || req.get('Referer'), // ? Obtiene el host de origen de la petición, por ejemplo 'http://localhost:3000' Es indispensable para enviar el email con el path correcto
    });

    res.json({ msg: 'Veterinario Registrado', veterinarianSaved });
  } catch (err) {
    console.error(err);
    const error = new Error('contacte al administrador');
    return res.status(500).json({ msg: error.message });
  }
};

const profile = (req, res) => {
  const { session } = req;
  res.json({ user: session.user });
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const veterinarian = await Veterinarian.findById(id).select('-token');

  if (!veterinarian) {
    const error = new Error('Hubo un error');
    return res.status(400).json({ msg: error.message });
  }

  // Si intenta cambiar el email Verificar que no lo tenga otro usuario registrado
  const { email } = body;
  if (veterinarian.email !== email) {
    const isEmailExists = await Veterinarian.findOne({ email });

    if (isEmailExists) {
      const error = new Error(
        'Email ya registrado en base de datos por otro usuario'
      );
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    veterinarian.name = body.name || veterinarian.name;
    veterinarian.web = body.web || '';
    veterinarian.phone = body.phone || '';
    veterinarian.email = body.email || veterinarian.email;

    const veterinarianUpdated = await veterinarian.save();

    return res.json(veterinarianUpdated);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ msg: 'Hubo un error, no se pudo actualizar' });
  }
};

const verify = async (req, res) => {
  const { token } = req.params;
  try {
    const userToVerify = await Veterinarian.findOne({ token });

    if (!userToVerify) {
      const error = new Error(`Token inválido`);

      return res.status(404).json({
        msg: error.message,
      });
    }

    userToVerify.token = null;
    userToVerify.verified = true;
    const userVerified = await userToVerify.save();

    return res.json({ msg: 'Usuario Verificado Exitosamente', userVerified });
  } catch (err) {
    console.error(err);
    const error = new Error('contacte al administrador');
    return res.status(500).json({ msg: error.message });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar se el usuario existe
  const user = await Veterinarian.findOne({ email });

  if (!user) {
    const error = new Error('Usuario no existe');
    return res.status(403).json({ msg: error.message });
  }

  if (!user.verified) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  if (!(await user.checkPassword(password))) {
    const error = new Error('Contraseña incorrecta');
    return res.status(403).json({ msg: error.message });
  }

  user.token = generateJWT({ id: user.id });

  return res.json({ user });
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const isUserExists = await Veterinarian.findOne({ email });

  if (!isUserExists) {
    const error = new Error('Usuario no existe en base de datos');
    return res.status(400).json({ msg: error.message });
  }

  try {
    isUserExists.token = generateToken();
    await isUserExists.save();

    // Enviar email
    await emailResetPassword({
      email,
      name: isUserExists.name,
      token: isUserExists.token,
      hostFrontend: req.get('Origin') || req.get('Referer'), // ? Obtiene el host de origen de la petición, por ejemplo 'http://localhost:3000' Es indispensable para enviar el email con el path correcto
    });

    return res.json({ msg: 'Hemos enviado un EMAIL con las instrucciones' });
  } catch (err) {
    console.error(err);
    const error = new Error('contacte al administrador');
    return res.status(500).json({ msg: error.message });
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const userValidToken = await Veterinarian.findOne({ token });

  if (!userValidToken) {
    const error = new Error('Token no válido');
    return res.status(400).json({ msg: error.message });
  }

  return res.json({ msg: 'Token válido. Ahora puedes cambiar la contraseña.' });
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await Veterinarian.findOne({ token });

  if (!user) {
    const error = new Error('Hubo un error');
    return res.status(400).json({ msg: error.message });
  }

  user.token = null;
  user.password = password; // No hay que hashearlo por aquí porque en el modelo hay un middleware que es pre-save y hashea el password antes de guardar al llamar al metodo "await user.save()"

  try {
    await user.save(); // Primero hashea el password y luego guarda en DB.

    return res.json({ msg: 'Contraseña cambiada exitosamente' });
  } catch (err) {
    console.error(err);
    const error = new Error('Revisar logs del servidor');
    return res.status(500).json({ msg: error.message });
  }
};

const changePassword = async (req, res) => {
  const {
    user: { id },
  } = req.session;
  const password = req.body;

  const isSomeFieldEmpty = Object.values(password).some(
    (field) => field.trim() === ''
  );

  if (isSomeFieldEmpty) {
    const error = new Error(
      'Contraseña Actual y Nueva Contraseña son obligatorias'
    );
    return res.status(400).json({ msg: error.message });
  }

  const veterinarian = await Veterinarian.findById(id);

  const text = password.p_old; // Password sin hashear.

  if (!(await veterinarian.checkPassword(text))) {
    const error = new Error('Contraseña actual incorrecta');
    return res.status(400).json({ msg: error.message });
  }

  if (password.p_new.length < 6) {
    const error = new Error(
      'La nueva contraseña debe tener al menos 6 caracteres'
    );
    return res.status(400).json({ msg: error.message });
  }

  veterinarian.password = password.p_new;

  await veterinarian.save();

  return res.json({ msg: 'Contraseña cambiada exitosamente' });
};

export {
  verify,
  profile,
  register,
  checkToken,
  newPassword,
  authenticate,
  resetPassword,
  updateProfile,
  changePassword,
};

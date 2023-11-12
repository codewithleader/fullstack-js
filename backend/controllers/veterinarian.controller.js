import Veterinarian from '../models/Veterinarian.model.js';
import generateJWT from '../helpers/generateJWT.js';
import generateToken from '../helpers/generateToken.js';

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

    res.json({ msg: 'Veterinario Registrado', veterinarianSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error, contactar a administrador' });
  }
};

const profile = (req, res) => {
  const { session } = req;
  res.json({ session });
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

    res.json({ msg: 'Usuario Verificado Exitosamente', userVerified });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error: Contacte al administrador',
    });
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

  const jwt = generateJWT({ id: user.id });

  return res.json({ msg: 'OK', jwt, user });
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

export {
  verify,
  profile,
  register,
  checkToken,
  newPassword,
  authenticate,
  resetPassword,
};

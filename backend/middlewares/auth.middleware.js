import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../dictionary-back.js';
import Veterinarian from '../models/Veterinarian.model.js';

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer')) {
    const error = new Error('JsonWebToken no válido o inexistente');

    return res.status(403).json({ msg: error.message });
  }

  try {
    const tokenWithoutBearer = token.split(' ')[1]; // ['Bearer', 'eyJhbGciOiJIUzI1NiIsInR5c...']
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
    const { id } = decoded;

    const user = await Veterinarian.findById(id).select('-token -verified');

    // Crear session
    req.session = { user };

    return next();
  } catch (err) {
    // console.error(err);
    const error = new Error('JsonWebToken no válido');
    return res.status(403).json({ msg: error.message });
  }
};

export default checkAuth;

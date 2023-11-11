import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../dictionary-back.js';

/**
 * The function generates a JSON Web Token (JWT) using a given payload and a secret key.
 * @param payload - The `payload` parameter is an object or a string that contains the data you want to include in
 * the JSON Web Token (JWT). This data can be any information that you want to securely transmit or
 * store. It can include user information, permissions, or any other relevant data.
 * @returns The function `generateJWT` is returning a JSON Web Token (JWT) that is generated using the
 * `jwt.sign` method from the `jsonwebtoken` library.
 */
const generateJWT = (payload) => {
  const options = {
    expiresIn: "30d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export default generateJWT;
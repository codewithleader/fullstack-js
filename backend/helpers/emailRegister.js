import nodemailer from 'nodemailer';
import {
  // HOST_FRONTEND_DEV,
  MAILTRAP_AUTH_PASS,
  MAILTRAP_AUTH_USER,
  MAILTRAP_HOST,
  MAILTRAP_PORT,
} from '../dictionary-back.js';

const emailRegister = async ({ email, name, token, hostFrontend }) => {
  const transport = nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: MAILTRAP_PORT,
    auth: {
      user: MAILTRAP_AUTH_USER,
      pass: MAILTRAP_AUTH_PASS,
    },
  });

  const info = await transport.sendMail({
    from: 'APV - Administrador de Pacientes de Veterinaria',
    to: email,
    subject: 'Comprueba tu cuenta en APV',
    text: 'Comprueba tu cuenta en APV',
    html: `<p>Hola ${name}, comprueba tu cuenta en APV.</p>
    <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
      <a href="${hostFrontend}/confirmar/${token}">Comprobar Cuenta</a>
    </p>
    <p>Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
    `,
  });

  console.log('Mensaje enviado: %s', info.messageId);
};

export default emailRegister;

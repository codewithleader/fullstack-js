import nodemailer from 'nodemailer';
import {
  // HOST_FRONTEND_DEV, // No se usará este ya que este es fijo, en cambio se usará hostFrontend que es dinamico (Puede ser cualquiera de los dominios web permitidos en los CORS)
  MAILTRAP_AUTH_PASS,
  MAILTRAP_AUTH_USER,
  MAILTRAP_HOST,
  MAILTRAP_PORT,
} from '../dictionary-back.js';

const emailResetPassword = async ({ email, name, token, hostFrontend }) => {
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
    subject: 'Reestablecer contraseña',
    text: 'Hemos recibido una solicitud de reestablecer contraseña',
    html: `<p>Hola ${name}, Hemos recibido una solicitud de reestablecer contraseña.</p>
    <p>Para cambiar la contraseña, sigue el siguiente enlace:
      <a href="${hostFrontend}/new-password/${token}">Reestablecer Contraseña</a>
    </p>
    <p>Si tu no hiciste esta solicitud de reestablecer tu contraseña puedes ignorar este mensaje</p>
    `,
  });

  console.log('Mensaje enviado: %s', info.messageId);
};

export default emailResetPassword;

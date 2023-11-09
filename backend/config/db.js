import mongoose from 'mongoose';
import { MONGO_CONNECTION } from '../dictionary-back.js';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_CONNECTION); // Objeto adicional de configuracion innecesario

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB conectado en ==>> ${url}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from 'mongoose';

let isConnected = false;

export const connect = async () => {
  if (isConnected) {
    console.log('Ya estábamos conectados');
    return;
  }

  await mongoose.connect(process.env.MONGODB_URL || '');
  isConnected = true;
  console.log('Conectado a MongoDB:', process.env.MONGODB_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development' || !isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log('Desconectado de MongoDB');
};

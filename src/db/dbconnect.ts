import mongoose from 'mongoose';
import getEnvVariable from '@/helpers/getEnvVariable';

export default async function dbconnect() {
  try {
    if (mongoose.connection?.readyState === 1)
      return { success: 'MongoDB connected' };
    await mongoose.connect(getEnvVariable('MONGODB_URI') as string);
    return { success: 'MongoDB connected' };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return { error: 'Could not connect to MongoDB' };
  }
}

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://user:user@localhost:27017/saint-vinci?authSource=admin';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Déclare globalement une propriété _mongoose pour gérer la connexion
declare global {
  var _mongoose: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null };
}

// Cache de connexion pour éviter les reconnexions multiples pendant le développement
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Si la connexion est déjà établie, on retourne la connexion
  if (cached.conn) {
    return cached.conn;
  }

  // Si la promesse de connexion n'existe pas, on la crée
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Réinitialisation de la promesse en cas d'erreur
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;
export { mongoose }; // Ajout de l'exportation de mongoose

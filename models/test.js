import mongoose from 'mongoose';

// Définition du schéma de l'étudiant
const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    class: {
      type: String,
      required: [true, 'La classe est requise'],
    },
    birthDate: {
      type: Date, // Utilisez "Date" au lieu de "String" pour les dates
      required: [true, 'La date de naissance est requise'],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Veuillez entrer un email valide"], // Validation de l'email
    },
    parentEmail: {
      type: String,
      required: [true, "L'email du parent est requis"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Veuillez entrer un email valide pour le parent"], // Validation de l'email
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Exportation conditionnelle pour éviter la redéclaration du modèle
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

// URI MongoDB
const MONGO_URI =
  'mongodb://user:user@localhost:27017/saint-vinci?authSource=admin';

// Fonction pour connecter à la base de données
async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    console.log('Déjà connecté à MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, { bufferCommands: false });
    console.log('Connecté à MongoDB avec Mongoose');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1); // Quitte le processus en cas d'échec de connexion
  }
}

// Exemple d'utilisation : Insérer un étudiant
(async () => {
  await connectToDatabase();

  try {
    const newStudent = await Student.create({
      firstName: 'Jean',
      lastName: 'Dupont',
      class: '5ème A',
      birthDate: new Date('2010-09-15'),
      email: 'jean.dupont@example.com',
      parentEmail: 'parent.dupont@example.com',
    });

    console.log('Étudiant inséré avec succès :', newStudent);
  } catch (error) {
    if (error.code === 11000) {
      console.error('Erreur : Email en doublon détecté');
    } else {
      console.error("Erreur lors de l'insertion de l'étudiant :", error);
    }
  } finally {
    await mongoose.disconnect(); // Déconnecte proprement de MongoDB
    console.log('Déconnecté de MongoDB');
  }
})();

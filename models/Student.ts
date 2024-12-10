import mongoose from 'mongoose';

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
      default: 'Non spécifiée', // Classe par défaut si non fournie
    },
    birthDate: {
      type: Date,
      required: [true, 'La date de naissance est requise'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      default: function () {
        // Génération d'un email basé sur le prénom et le nom
        return `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@example.com`;
      },
    },
    parentEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: 'parent@example.com', // Email parent par défaut
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.StudentModel || mongoose.model('Student', StudentSchema);

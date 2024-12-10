import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
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
    type: String,
    required: [true, 'La date de naissance est requise'],
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  parentEmail: {
    type: String,
    required: [true, "L'email du parent est requis"],
    trim: true,
    lowercase: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudentModel from '@/models/Student';
import { Student } from '@/types/index';
import { Types } from 'mongoose';

export async function POST(request: Request) {
  try {
    await connectDB();
    //const students = await request.json();

    // Insérer les documents dans MongoDB
    const students = await request.json();
    console.log('Students data:', students);

    // Validation de la structure de données (assurez-vous que c'est un tableau d'étudiants)
    if (!Array.isArray(students)) {
      return new NextResponse('Invalid data format', { status: 400 });
    }

    const preparedStudents: Student[] = students.map((student) => ({
      id: new Types.ObjectId().toString(), // Utilisation de mongoose.Types.ObjectId pour générer un id
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate, // Utiliser la date telle quelle
      email: student.email, // Générer un email basé sur prénom et nom
      parentEmail: student.parentEmail, // Email parent par défaut
      class: student.class, // Classe par défaut
    }));

    const result = await StudentModel.insertMany(preparedStudents, { ordered: false }).catch((error) => {
      if (error.writeErrors) {
        console.error('Write errors during insertMany:', error.writeErrors);
        return error.insertedDocs || [];
      }
      throw error;
    });
    console.log(result)


    return NextResponse.json({
      message: 'Import terminé avec succès',
      imported: Array.isArray(result) ? result.length : 0,
    });
  } catch (error) {
    console.error('Erreur lors de l\'import:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'import des élèves' },
      { status: 500 }
    );
  }
}
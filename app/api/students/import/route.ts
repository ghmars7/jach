import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Student from '@/models/Student';

export async function POST(request: Request) {
  try {
    await connectDB();
    const students = await request.json();

    // Utiliser insertMany avec ordered: false pour continuer même si certains documents échouent
    const result = await Student.insertMany(students, { ordered: false })
      .catch(error => {
        // Si certains documents sont en doublon (email unique), on compte quand même les succès
        if (error.writeErrors) {
          return error.insertedDocs;
        }
        throw error;
      });

    return NextResponse.json({
      message: 'Import terminé avec succès',
      imported: Array.isArray(result) ? result.length : 0
    });
  } catch (error) {
    console.error('Erreur lors de l\'import:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'import des élèves' },
      { status: 500 }
    );
  }
}
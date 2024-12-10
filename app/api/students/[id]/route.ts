import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Student from '@/models/Student';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const student = await Student.findById(params.id);
    if (!student) {
      return NextResponse.json({ error: 'Élève non trouvé' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération de l'élève" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await request.json();
    const student = await Student.findByIdAndUpdate(params.id, data, { new: true });
    if (!student) {
      return NextResponse.json({ error: 'Élève non trouvé' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'élève" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const student = await Student.findByIdAndDelete(params.id);
    if (!student) {
      return NextResponse.json({ error: 'Élève non trouvé' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Élève supprimé avec succès' });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression de l'élève" }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Student from '@/models/Student';

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find({}).sort({ lastName: 1 });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des élèves' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const student = await Student.create(data);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création de l'élève" }, { status: 500 });
  }
}
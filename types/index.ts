export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  birthDate: string;
  email: string;
  parentEmail: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  teacherId: string;
  students: number;
  subjects: string[];
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subjects: string[];
  mainClass?: string;
}

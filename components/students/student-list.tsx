"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { Student } from "@/types";

const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    class: "6ème A",
    birthDate: "2012-05-15",
    email: "jean.dupont@ecole.fr",
    parentEmail: "parent.dupont@email.com",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    class: "5ème B",
    birthDate: "2011-08-22",
    email: "marie.martin@ecole.fr",
    parentEmail: "parent.martin@email.com",
  },
];

interface StudentListProps {
  searchQuery: string;
  selectedClass: string;
}

export function StudentList({ searchQuery, selectedClass }: StudentListProps) {
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Email Parent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.parentEmail}</TableCell>
              <TableCell className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { Student } from "@/types";
import { useStudents } from "@/hooks/useStudents";
import { useRouter } from "next/navigation";



interface StudentListProps {
  searchQuery: string;
  selectedClass: string;
}

export function StudentList({ searchQuery, selectedClass }: StudentListProps) {
  const { students, isLoading, mutate } = useStudents();
  const router = useRouter();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const filteredStudents = students?.filter((student: any) => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      try {
        await fetch(`/api/students/${id}`, {
          method: 'DELETE',
        });
        mutate();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
    <div className="flex justify-end">
    </div>
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
          {filteredStudents?.map((student: any) => (
            <TableRow key={student._id}>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.parentEmail}</TableCell>
              <TableCell className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => router.push(`/dashboard/students/${student._id}/edit`)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(student._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
  );
}

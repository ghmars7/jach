"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { Class } from "@/types";

const mockClasses: Class[] = [
  {
    id: "1",
    name: "6ème A",
    level: "6ème",
    teacherId: "1",
    students: 25,
    subjects: ["Mathématiques", "Français", "Histoire-Géo"],
  },
  {
    id: "2",
    name: "5ème B",
    level: "5ème",
    teacherId: "2",
    students: 28,
    subjects: ["Mathématiques", "Français", "Histoire-Géo"],
  },
];

interface ClassListProps {
  searchQuery: string;
  selectedLevel: string;
}

export function ClassList({ searchQuery, selectedLevel }: ClassListProps) {
  const filteredClasses = mockClasses.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || cls.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Effectif</TableHead>
            <TableHead>Matières</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>{cls.name}</TableCell>
              <TableCell>{cls.level}</TableCell>
              <TableCell>{cls.students} élèves</TableCell>
              <TableCell>{cls.subjects.join(", ")}</TableCell>
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

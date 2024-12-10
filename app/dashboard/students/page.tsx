"use client";

import { useState } from "react";
import { StudentList } from "@/components/students/StudentsList";
import { StudentFilters } from "@/components/students/StudentsFilters";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Élèves</h2>
        <Button onClick={() => router.push("/dashboard/students/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvel Élève
        </Button>
      </div>
      <StudentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />
      <StudentList searchQuery={searchQuery} selectedClass={selectedClass} />
    </div>
  );
}

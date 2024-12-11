"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Student } from "@/types";
import { useState } from "react";
import Papa from "papaparse"; // CSV parser
import * as XLSX from "xlsx"; // XLSX parser
import { useToast } from "@/hooks/use-toast";

export interface FileData extends Student {
  level: string; // Niveau (par exemple, "1ère section maternelle")
  teacherName?: string; // Nom du professeur (par exemple, "Dufour Zoé")
}

const formatLevel = (level: string): string => {
  if (level.includes("1ère section maternelle")) {
    return "Petite Section";
  } else if (level.includes("2ème section maternelle")) {
    return "Moyenne Section";
  } else if (level.includes("3ème section maternelle")) {
    return "Grande Section";
  }
  return level; // Si aucun remplacement n'est trouvé, retourner la valeur telle quelle
}

export default function ImportPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [file, setFile] = useState<File | null>(null); // Track the selected file
  const { toast } = useToast();

  // Handle the file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Function to format imported data
  const formatStudentData = (data: any[]): FileData[] => {
    return data
      .filter((row) => row && typeof row === "object") // Filtre pour s'assurer que chaque 'row' est un objet
      .map((row) => {
        // Extraire les données de la ligne CSV
        const firstName = row["Prénom Élève"] || row["prenom"] || row["Prénom"] || "Inconnu";
        const lastName = row["Nom Élève"] || row["nom"] || "Inconnu";
        const birthDate = row["Date de Naissance"] || row["date_naissance"] || "01/01/1970";
        const level = formatLevel(row["Niveau"] || "Non spécifié");
        const teacherName = row["Nom Professeur"] || "Non spécifié";
  
        // Génération de l'email
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ecole.fr`;
        const parentEmail = `parent.${lastName.toLowerCase()}@email.com`;
  
        return {
          id: '', // Génération d'un ID unique pour chaque étudiant
          lastName,
          firstName,
          birthDate,
          email,
          parentEmail,
          class: level, // Utilisation de 'level' comme classe
          level, // Niveau
        };
      });
  };
  

  // Function to parse CSV files
  const parseCSVFile = (fileContent: string) => {
    Papa.parse(fileContent, {
      complete: (result) => {
        if (result.errors.length > 0) {
          toast({
            title: "Erreur",
            description: "Erreur lors du parsing du fichier CSV.",
            variant: "destructive",
          });
        } else {
          const formattedData = formatStudentData(result.data as any[]);
          setStudents(formattedData);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  // Function to parse XLS/XLSX files
  const parseXLSXFile = (fileContent: ArrayBuffer) => {
    const workbook = XLSX.read(fileContent, { type: "array" });
    const sheetNames = workbook.SheetNames;
    const firstSheet = workbook.Sheets[sheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { raw: false });
    const formattedData = formatStudentData(jsonData as any[]);
    setStudents(formattedData);
  };

  // Handle the "Import" button click to process the file
  const handleImportClick = async () => {
    if (!file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à importer.",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileContent = e.target?.result;
        if (!fileContent) {
          toast({
            title: "Erreur",
            description: "Impossible de lire le contenu du fichier.",
            variant: "destructive",
          });
          return;
        }

        // Process file based on its extension
        if (fileExtension === "csv") {
          parseCSVFile(fileContent.toString());
        } else if (fileExtension === "xls" || fileExtension === "xlsx") {
          parseXLSXFile(fileContent as ArrayBuffer);
        } else {
          toast({
            title: "Erreur",
            description: "Type de fichier non supporté.",
            variant: "destructive",
          });
        }

        // Prepare data for API
        const response = await fetch("/api/students/import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(students),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'import");
        }

        const result = await response.json();
        toast({
          title: "Import réussi",
          description: `${result.imported} élèves importés avec succès.`,
        });
      };

      if (fileExtension === "csv") {
        reader.readAsText(file, "utf-8");
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'import.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Imports</h2>
        <div className="flex">
          {/* File input */}
          <Input
            type="file"
            className="w-[300px] mx-4"
            onChange={handleFileChange}
            accept=".csv,.xls,.xlsx"
          />
          {/* Import button */}
          <Button className="mx-4" onClick={handleImportClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>
      <div>
        {students && students.length > 0
          ? students.map((student, index) => (
              <div key={index} className="p-2 border rounded-md my-2">
                {student.firstName} {student.lastName} - {student.birthDate} - {student.class}
              </div>
            ))
          : "Aucune donnée importée"}
      </div>
    </div>
  );
}

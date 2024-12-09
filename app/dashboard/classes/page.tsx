"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { ClassList } from "@/components/classes/class-list";
import { ClassFilters } from "@/components/classes/class-filters";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Classes</h2>
          <Button onClick={() => router.push("/dashboard/classes/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle Classe
          </Button>
        </div>
        <ClassFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
        <ClassList searchQuery={searchQuery} selectedLevel={selectedLevel} />
      </div>
    </DashboardLayout>
  );
}
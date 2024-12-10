"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
}

export function StudentFilters({ searchQuery, setSearchQuery, selectedClass, setSelectedClass }: StudentFiltersProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Input
          placeholder="Rechercher un élève..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={selectedClass} onValueChange={setSelectedClass}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par classe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les classes</SelectItem>
          <SelectItem value="6ème A">6ème A</SelectItem>
          <SelectItem value="5ème B">5ème B</SelectItem>
          <SelectItem value="4ème A">4ème A</SelectItem>
          <SelectItem value="3ème B">3ème B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

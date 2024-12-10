"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">EduManager Pro</h1>
          <p className="text-muted-foreground">Système de gestion scolaire pour les professionnels de l éducation</p>
        </div>

        <div className="space-y-4">
          <Button className="w-full" size="lg" onClick={() => router.push("/auth/login")}>
            Connexion
          </Button>
          <p className="text-sm text-center text-muted-foreground">Plateforme réservée au personnel autorisé</p>
        </div>
      </Card>
    </div>
  );
}

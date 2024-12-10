"use client";

import { Card } from "@/components/ui/card";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue sur votre espace de gestion</p>
          </div>

          <StatsCards />

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Classes actives</h2>
              {/* Liste des classes à implémenter */}
            </Card>
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}

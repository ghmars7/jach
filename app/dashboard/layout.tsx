"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, Settings, LogOut, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
  { icon: Users, label: "Élèves", href: "/dashboard/students" },
  { icon: GraduationCap, label: "Classes", href: "/dashboard/classes" },
  { icon: BookOpen, label: "Matières", href: "/dashboard/subjects" },
  { icon: ClipboardList, label: "Notes", href: "/dashboard/grades" },
  { icon: Import, label: "Import", href: "/dashboard/import" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={cn("bg-white border-r transition-all duration-300", collapsed ? "w-16" : "w-64")}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-center border-b">
            <h1 className={cn("font-bold", collapsed ? "hidden" : "block")}>Jach Manager</h1>
          </div>
          <nav className="flex-1 p-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg mb-1"
              >
                <item.icon className="h-5 w-5" />
                <span className={cn("text-sm", collapsed ? "hidden" : "block")}>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/")}>
              <LogOut className="h-5 w-5 mr-2" />
              <span className={cn(collapsed ? "hidden" : "block")}>Déconnexion</span>
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}

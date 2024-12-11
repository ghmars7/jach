"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: ('admin' | 'teacher')[];
}

const sidebarItems: SidebarItem[] = [
  { 
    icon: LayoutDashboard, 
    label: "Tableau de bord", 
    href: "/dashboard",
    roles: ['admin', 'teacher']
  },
  { 
    icon: Users, 
    label: "Élèves", 
    href: "/dashboard/students",
    roles: ['admin', 'teacher']
  },
  { 
    icon: GraduationCap, 
    label: "Classes", 
    href: "/dashboard/classes",
    roles: ['admin']
  },
  { 
    icon: BookOpen, 
    label: "Matières", 
    href: "/dashboard/subjects",
    roles: ['admin']
  },
  { 
    icon: ClipboardList, 
    label: "Notes", 
    href: "/dashboard/grades",
    roles: ['admin', 'teacher']
  },
  { 
    icon: ClipboardList, 
    label: "Import", 
    href: "/dashboard/import",
    roles: ['admin', 'teacher']
  },
  { 
    icon: Settings, 
    label: "Paramètres", 
    href: "/dashboard/settings",
    roles: ['admin']
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const filteredSidebarItems = sidebarItems.filter(
    item => item.roles.includes(user?.role || 'teacher')
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={cn(
          "bg-white border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <h1 className={cn("font-bold", collapsed ? "hidden" : "block")}>
              École Manager
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "→" : "←"}
            </Button>
          </div>
          <nav className="flex-1 p-4">
            {filteredSidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg mb-1"
              >
                <item.icon className="h-5 w-5" />
                <span className={cn("text-sm", collapsed ? "hidden" : "block")}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            {!collapsed && (
              <div className="mb-4 px-2">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'admin' ? 'Administrateur' : 'Professeur'}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className={cn(collapsed ? "hidden" : "block")}>
                Déconnexion
              </span>
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
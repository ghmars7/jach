"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// Définir un type pour formData
interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  mainClass: string;
}

const setCookie = (name: string, value: string, days?: number) => {
  const expires = days
    ? `; expires=${new Date(Date.now() + days * 86400000).toUTCString()}`
    : "";
  document.cookie = `${name}=${value}; path=/; Secure${expires}`;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    mainClass: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setAuth } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Stocker le token
      setCookie("token", data.token, 1); // Cookie expire dans 1 jour
      setCookie("user", JSON.stringify(data.user), 1);
      setAuth(data.user, data.token);

      toast({
        title: "Inscription réussie",
        description: "Vous allez être redirigé vers le tableau de bord",
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">Inscription</h2>
        <p className="text-sm text-muted-foreground">
          Créez votre compte pour accéder au tableau de bord
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">Professeur</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.role === 'teacher' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="mainClass">Classe principale</Label>
                <Input
                  id="mainClass"
                  value={formData.mainClass}
                  onChange={(e) => setFormData({ ...formData, mainClass: e.target.value })}
                  required
                />
              </div>
              
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/" className="text-primary hover:underline">
              Connexion
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

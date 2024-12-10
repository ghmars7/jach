"use client";

import { useState , useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useStudent } from "@/hooks/useStudents";
import { useParams, useRouter } from 'next/navigation'


export default function NewStudentForm() {
    const params = useParams<{ id: string }>();
    const { student, isLoading, mutate } = useStudent(params?.id);
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: null,
        class: "",
        parentEmail: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Gerer l'erreur Params.id
    // useEffect(() => {
    //     if (params?.id) {
    //         // Appeler une fonction pour récupérer les données de l'élève
    //         fetchData(params.id);
    //     }
    // }, [params?.id]);
    
    // const fetchData = async (id: string) => {
    //     const { student, error } = await getStudentData(id);
    //     if (student) {
    //         setFormData({
    //             firstName: student.firstName || "",
    //             lastName: student.lastName || "",
    //             birthDate: student.birthDate || null,
    //             class: student.class || "",
    //             parentEmail: student.parentEmail || "",
    //         });
    //     } else if (error) {
    //         console.error("Erreur lors de la récupération des données", error);
    //     }
    // };
    

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validation des champs
        if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.class) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        const formattedData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            email: `${formData.firstName}.${formData.lastName}@ecole.fr`.toLowerCase(),
            parentEmail: formData.parentEmail ? formData.parentEmail : `parent.${formData.lastName}@email.com`.toLowerCase(),
            class: formData.class,
        };

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/students/${params?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert("Eleve modifier avec succès !");
                mutate();
                router.push('/dashboard/students');
               
            } else {
                const errorData = await response.json();
                alert(`Erreur : ${errorData.error || "Échec de l'ajout de l'éleve"}`);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Une erreur est survenue.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Gérer l'état de chargement
    if (isLoading) {
        return <div>Chargement...</div>;
    }

    // Gérer l'absence d'étudiant
    if (!student) {
        return <div>Aucun étudiant trouvé</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Modifier un élève</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="Entrer prénom"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="Entrer nom"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="birthDate">Date de naissance *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full text-left">
                                {formData.birthDate
                                    ? format(formData.birthDate, "dd/MM/yyyy")
                                    : "Choisissez la date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start">
                            <Calendar
                                mode="single"
                                selected={formData.birthDate || undefined}
                                onSelect={(date: Date | undefined) => handleChange("birthDate", date)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Label htmlFor="class">Classe *</Label>
                    <Select onValueChange={(value) => handleChange("class", value)} value={formData.class} > 
                        <SelectTrigger id="class">
                            <SelectValue placeholder="Sélectionnez une classe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="6eme">6eme</SelectItem>
                            <SelectItem value="5eme">5eme</SelectItem>
                            <SelectItem value="4eme">4eme</SelectItem>
                            <SelectItem value="3eme">3eme</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="parentEmail">Email des parents</Label>
                    <Input
                        id="parentEmail"
                        type="email"
                        placeholder="Entrer email parent"
                        value={formData.parentEmail}
                        onChange={(e) => handleChange("parentEmail", e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Création..." : "Modifier l'élève"}
                </Button>
            </form>
        </div>
    );
}

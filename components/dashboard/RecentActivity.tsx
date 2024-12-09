import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      description: "Note ajoutée en Mathématiques",
      time: "Il y a 5 minutes",
      user: "M. Martin",
    },
    {
      id: 2,
      description: "Nouvel élève inscrit",
      time: "Il y a 30 minutes",
      user: "Mme. Bernard",
    },
    {
      id: 3,
      description: "Absence signalée",
      time: "Il y a 1 heure",
      user: "M. Dubois",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2">
        <Activity className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Activité récente</h2>
      </div>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div>
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-muted-foreground">Par {activity.user}</p>
            </div>
            <span className="text-sm text-muted-foreground">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
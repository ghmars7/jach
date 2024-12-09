export default function StatsCards() {
  const stats = [
    { name: "Total Élèves", value: "486" },
    { name: "Classes", value: "24" },
    { name: "Professeurs", value: "32" },
    { name: "Moyenne Générale", value: "14.8" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.name}</div>
        </div>
      ))}
    </div>
  );
}
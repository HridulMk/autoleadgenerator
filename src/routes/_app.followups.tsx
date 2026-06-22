import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Phone, AlertTriangle, CalendarCheck } from "lucide-react";
import { leads } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/followups")({
  head: () => ({ meta: [{ title: "Follow-ups — Leadify" }] }),
  component: Followups,
});

function Followups() {
  const now = Date.now();
  const withDate = leads.filter((l) => l.followUpDate);
  const today = withDate.filter((l) => {
    const d = new Date(l.followUpDate!);
    const t = new Date();
    return d.toDateString() === t.toDateString();
  });
  const upcoming = withDate.filter((l) => new Date(l.followUpDate!).getTime() > now && !today.includes(l));
  const missed = withDate.filter((l) => new Date(l.followUpDate!).getTime() < now && !today.includes(l));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Follow-ups</h1>
        <p className="text-sm text-muted-foreground">Stay on top of your commitments.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Section title="Today's Follow-ups" icon={CalendarCheck} accent="text-primary" leads={today} empty="All caught up for today." />
        <Section title="Upcoming" icon={CalendarClock} accent="text-chart-2" leads={upcoming} empty="Nothing scheduled yet." />
        <Section title="Missed" icon={AlertTriangle} accent="text-chart-5" leads={missed} empty="No missed follow-ups." />
      </div>
    </div>
  );
}

function Section({
  title, icon: Icon, accent, leads: list, empty,
}: {
  title: string; icon: React.ElementType; accent: string;
  leads: typeof leads; empty: string;
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${accent}`} />
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge variant="outline" className="ml-auto">{list.length}</Badge>
      </div>
      {list.length === 0 ? (
        <p className="rounded-lg bg-muted p-4 text-center text-xs text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {list.map((l) => (
            <li key={l.id} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{l.business}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(l.followUpDate!).toLocaleDateString()} • {l.city}
                </p>
              </div>
              <Button size="sm" variant="outline"><Phone className="h-3.5 w-3.5" /></Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { leads } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/analysis")({
  head: () => ({ meta: [{ title: "AI Analysis — Leadify" }] }),
  component: Analysis,
});

function Analysis() {
  const [id, setId] = useState(leads[0].id);
  const lead = leads.find((l) => l.id === id)!;
  const data = [
    { axis: "Digital Maturity", value: lead.digitalMaturity },
    { axis: "Online Presence", value: lead.onlinePresence },
    { axis: "Marketing Need", value: lead.marketingNeed },
    { axis: "Reviews", value: Math.min(100, lead.reviews / 5) },
    { axis: "Rating", value: lead.rating * 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Analysis</h1>
          <p className="text-sm text-muted-foreground">Deep-dive scoring for any lead.</p>
        </div>
        <Select value={id} onValueChange={setId}>
          <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {leads.map((l) => <SelectItem key={l.id} value={l.id}>{l.business}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <ScoreCard label="Digital Maturity" value={lead.digitalMaturity} />
          <ScoreCard label="Online Presence" value={lead.onlinePresence} />
          <ScoreCard label="Marketing Need" value={lead.marketingNeed} />
          <Card className="border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Overall Lead Score
            </div>
            <div className="mt-2 text-5xl font-bold text-primary">{lead.score}<span className="text-lg text-muted-foreground">/100</span></div>
            <Badge className="mt-3" variant="outline">{lead.priority} Priority</Badge>
          </Card>
        </div>

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-2 text-sm font-semibold">Profile breakdown — {lead.business}</h3>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={data}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
              <Radar name="Score" dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="mt-4 rounded-lg bg-muted p-4 text-sm">
            <span className="font-semibold">Recommendation: </span>{lead.aiExplanation}
          </p>
        </Card>
      </div>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold">{value}/100</span>
      </div>
      <Progress value={value} className="mt-3 h-2" />
    </Card>
  );
}
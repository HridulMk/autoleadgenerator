import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Phone, Globe, Star, Sparkles, Building2 } from "lucide-react";
import { leads } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/calls/$id")({
  loader: ({ params }) => {
    const lead = leads.find((l) => l.id === params.id);
    if (!lead) throw notFound();
    return { lead };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.lead.business ?? "Lead"} — Leadify` }],
  }),
  component: LeadDetails,
  notFoundComponent: () => <div className="p-8">Lead not found.</div>,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
});

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}/100</span>
      </div>
      <Progress value={value} className="mt-2 h-2" />
    </div>
  );
}

function LeadDetails() {
  const { lead } = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <Link to="/calls" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to call list
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" /> {lead.industry} • {lead.city}
              </div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">{lead.business}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground" /> {lead.phone}</span>
                <a href="#" className="inline-flex items-center gap-1.5 text-primary"><Globe className="h-4 w-4" /> {lead.website}</a>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-chart-3 text-chart-3" /> {lead.rating} ({lead.reviews} reviews)
                </span>
              </div>
            </div>
            <Button size="lg"><Phone className="mr-2 h-4 w-4" /> Call now</Button>
          </div>

          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> AI Explanation
            </div>
            <p className="text-sm text-foreground">{lead.aiExplanation}</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Metric label="Digital Maturity" value={lead.digitalMaturity} />
            <Metric label="Online Presence" value={lead.onlinePresence} />
            <Metric label="Marketing Need" value={lead.marketingNeed} />
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">AI Lead Score</p>
          <div className="relative mt-4 flex h-40 w-40 items-center justify-center rounded-full bg-primary/10">
            <div className="text-5xl font-bold text-primary">{lead.score}</div>
            <div className="absolute bottom-6 text-xs text-muted-foreground">/ 100</div>
          </div>
          <Badge className="mt-4" variant="outline">{lead.priority} Priority</Badge>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Ranked #{lead.rank} in today's queue
          </p>
        </Card>
      </div>
    </div>
  );
}
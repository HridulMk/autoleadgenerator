import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import {
  Users, PhoneCall, AlertTriangle, CheckCircle2, TrendingUp,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { kpis, leadsByIndustry, leadsByLocation, priorityDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Leadify" }] }),
  component: Dashboard,
});

const PRIO_COLORS = ["var(--color-chart-5)", "var(--color-chart-3)", "var(--color-chart-2)"];

function Stat({ icon: Icon, label, value, trend, accent }: {
  icon: React.ElementType; label: string; value: string; trend?: string; accent?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          {trend && <p className="mt-1 text-xs text-primary">{trend}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent ?? "bg-primary/10 text-primary"}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Today's pipeline at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat icon={Users} label="Total Leads" value={kpis.totalLeads.toLocaleString()} trend="+12% this week" />
        <Stat icon={TrendingUp} label="New Today" value={String(kpis.newToday)} trend="+5 vs yesterday" accent="bg-chart-2/10 text-chart-2" />
        <Stat icon={AlertTriangle} label="High Priority" value={String(kpis.highPriority)} accent="bg-chart-5/10 text-chart-5" />
        <Stat icon={PhoneCall} label="Calls Completed" value={String(kpis.callsCompleted)} accent="bg-chart-3/10 text-chart-3" />
        <Stat icon={CheckCircle2} label="Conversion Rate" value={`${kpis.conversionRate}%`} trend="+2.1% MoM" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold">Leads by Industry</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={leadsByIndustry}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={priorityDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {priorityDistribution.map((_, i) => <Cell key={i} fill={PRIO_COLORS[i]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold">Leads by Location</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={leadsByLocation} layout="vertical">
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={12} width={80} />
            <Tooltip cursor={{ fill: "var(--color-muted)" }} />
            <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
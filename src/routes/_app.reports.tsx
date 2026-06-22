import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import { callsTrend, leadsByIndustry, leadsByLocation, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports & Analytics — Leadify" }] }),
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground">Performance trends across your team.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Metric label="Total Calls" value="1,284" sub="+8% WoW" />
        <Metric label="Total Conversions" value="236" sub="+14 vs last week" />
        <Metric label="Conversion Rate" value={`${kpis.conversionRate}%`} sub="+2.1% MoM" />
        <Metric label="Avg. Lead Score" value="78" sub="Quality on the rise" />
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold">Calls & Conversions — last 7 days</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={callsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="calls" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="conversions" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Top Industries</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadsByIndustry}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Top Locations</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadsByLocation} layout="vertical">
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={11} width={80} />
              <Tooltip cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-primary">{sub}</p>
    </Card>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Phone, Search, ArrowUpDown, Star } from "lucide-react";
import { leads, INDUSTRIES, type Priority } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/calls")({
  head: () => ({ meta: [{ title: "Daily Call List — Leadify" }] }),
  component: CallList,
});

function priorityBadge(p: Priority) {
  const map = {
    High: "bg-chart-5/15 text-chart-5 border-chart-5/30",
    Medium: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    Low: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  } as const;
  return map[p];
}

function CallList() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score" | "rating">("score");

  const rows = useMemo(() => {
    return leads
      .filter((l) =>
        (industry === "all" || l.industry === industry) &&
        (priority === "all" || l.priority === priority) &&
        (q === "" || l.business.toLowerCase().includes(q.toLowerCase()) || l.city.toLowerCase().includes(q.toLowerCase()))
      )
      .sort((a, b) => sortBy === "score" ? b.score - a.score : b.rating - a.rating);
  }, [q, industry, priority, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            Daily Cold Call List <Star className="h-5 w-5 fill-primary text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground">Your AI-ranked priority list for today.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {rows.length} lead{rows.length === 1 ? "" : "s"} ready
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search business or city..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-[170px]"><SelectValue placeholder="Industry" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All industries</SelectItem>
              {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setSortBy(sortBy === "score" ? "rating" : "score")}>
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort: {sortBy}
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-mono text-muted-foreground">#{l.rank}</TableCell>
                <TableCell>
                  <Link to="/calls/$id" params={{ id: l.id }} className="font-medium hover:text-primary">
                    {l.business}
                  </Link>
                  <div className="text-xs text-muted-foreground">{l.phone}</div>
                </TableCell>
                <TableCell className="text-sm">{l.industry}</TableCell>
                <TableCell className="text-sm">{l.city}</TableCell>
                <TableCell className="text-right font-semibold">{l.score}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityBadge(l.priority)}>{l.priority}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => toast.success(`Calling ${l.business}...`)}>
                    <Phone className="mr-2 h-3.5 w-3.5" /> Call
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
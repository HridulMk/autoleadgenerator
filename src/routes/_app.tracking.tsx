import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { leads, type CallStatus } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/tracking")({
  head: () => ({ meta: [{ title: "Call Tracking — Leadify" }] }),
  component: Tracking,
});

const STATUSES: CallStatus[] = [
  "Called", "No Response", "Interested",
  "Follow-up Required", "Meeting Scheduled", "Converted",
];

function Tracking() {
  const [id, setId] = useState(leads[0].id);
  const lead = leads.find((l) => l.id === id)!;
  const [status, setStatus] = useState<CallStatus>("Called");
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Call Tracking</h1>
        <p className="text-sm text-muted-foreground">Log call outcomes and keep your pipeline accurate.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Lead</Label>
              <Select value={id} onValueChange={setId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {leads.map((l) => <SelectItem key={l.id} value={l.id}>{l.business} • {l.city}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Call status</Label>
              <RadioGroup value={status} onValueChange={(v) => setStatus(v as CallStatus)} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {STATUSES.map((s) => (
                  <label key={s} className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value={s} />
                    {s}
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="What did the prospect say? Next steps, objections, timing..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNotes("")}>Cancel</Button>
              <Button onClick={() => toast.success(`Call logged for ${lead.business}`)}>Save update</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold">{lead.business}</h3>
          <p className="text-xs text-muted-foreground">{lead.phone}</p>
          <div className="mt-4 space-y-3 text-sm">
            <Row k="Industry" v={lead.industry} />
            <Row k="City" v={lead.city} />
            <Row k="AI Score" v={String(lead.score)} />
            <Row k="Priority" v={<Badge variant="outline">{lead.priority}</Badge>} />
            <Row k="Current status" v={<Badge>{lead.status}</Badge>} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
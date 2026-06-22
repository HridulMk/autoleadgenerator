import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { INDUSTRIES, CITIES, leads } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/discover")({
  head: () => ({ meta: [{ title: "Lead Discovery — Leadify" }] }),
  component: Discover,
});

function Discover() {
  const [industry, setIndustry] = useState("Restaurant");
  const [city, setCity] = useState("Mumbai");
  const [rating, setRating] = useState<number[]>([3, 5]);
  const [website, setWebsite] = useState(false);
  const [social, setSocial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof leads>([]);

  function generate() {
    setLoading(true);
    setTimeout(() => {
      setResults(leads.slice(0, 6));
      setLoading(false);
      toast.success("6 new leads generated");
    }, 900);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Lead Discovery</h1>
        <p className="text-sm text-muted-foreground">Generate fresh leads tuned to your filters.</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CITIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Rating range: {rating[0]} – {rating[1]}</Label>
            <Slider min={1} max={5} step={0.5} value={rating} onValueChange={setRating} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label>Website available</Label>
              <p className="text-xs text-muted-foreground">Only show leads with a website</p>
            </div>
            <Switch checked={website} onCheckedChange={setWebsite} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label>Social media presence</Label>
              <p className="text-xs text-muted-foreground">Has at least one active profile</p>
            </div>
            <Switch checked={social} onCheckedChange={setSocial} />
          </div>
          <div className="flex items-end">
            <Button className="w-full" size="lg" onClick={generate} disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating</> :
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Leads</>}
            </Button>
          </div>
        </div>
      </Card>

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <Card key={l.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{l.business}</h3>
                  <p className="text-xs text-muted-foreground">{l.industry} • {l.city}</p>
                </div>
                <Badge variant="outline">{l.score}</Badge>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{l.aiExplanation}</p>
              <Button size="sm" variant="outline" className="mt-4 w-full">Add to call list</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
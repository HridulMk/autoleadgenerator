import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trash2, Plus, KeyRound } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — Leadify" }] }),
  component: Settings,
});

const initialUsers = [
  { name: "Alex Sharma", email: "alex@leadify.io", role: "Admin" },
  { name: "Priya Nair", email: "priya@leadify.io", role: "Sales" },
  { name: "Rohan Mehta", email: "rohan@leadify.io", role: "Sales" },
];

function Settings() {
  const [users, setUsers] = useState(initialUsers);
  const [weights, setWeights] = useState({ digital: [40], presence: [30], need: [30] });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Settings</h1>
        <p className="text-sm text-muted-foreground">Manage workspace, integrations, and AI scoring.</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="scoring">Lead Scoring</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Team members</h3>
              <Button size="sm"><Plus className="mr-1 h-4 w-4" /> Invite user</Button>
            </div>
            <ul className="divide-y">
              {users.map((u, i) => (
                <li key={u.email} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{u.role}</Badge>
                    <Button size="icon" variant="ghost" onClick={() => setUsers(users.filter((_, j) => j !== i))}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-4">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold">API keys</h3>
            <div className="space-y-3">
              {["Google Places", "OpenAI", "Twilio"].map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-lg border p-3">
                  <KeyRound className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s}</p>
                    <p className="font-mono text-xs text-muted-foreground">sk-•••••••••••••••••</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast("Rotate key flow")}>Rotate</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="scoring" className="mt-4">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold">Lead scoring rules</h3>
            <div className="space-y-5">
              {([
                ["digital", "Digital Maturity weight"],
                ["presence", "Online Presence weight"],
                ["need", "Marketing Need weight"],
              ] as const).map(([k, label]) => (
                <div key={k}>
                  <div className="flex justify-between text-sm">
                    <Label>{label}</Label>
                    <span className="font-mono text-xs">{weights[k][0]}%</span>
                  </div>
                  <Slider
                    value={weights[k]}
                    onValueChange={(v) => setWeights({ ...weights, [k]: v })}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
              ))}
              <Button onClick={() => toast.success("Scoring rules saved")}>Save rules</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="mt-4">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold">Data sources</h3>
            <div className="space-y-3">
              {[
                { name: "Google Maps", enabled: true },
                { name: "JustDial", enabled: true },
                { name: "Yellow Pages", enabled: false },
                { name: "LinkedIn Sales Nav", enabled: false },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Pull leads from this source</p>
                  </div>
                  <Switch defaultChecked={s.enabled} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <Label htmlFor="org">Organization name</Label>
          <Input id="org" defaultValue="Leadify Inc." className="mt-2" />
        </Card>
        <Card className="p-5">
          <Label htmlFor="tz">Time zone</Label>
          <Input id="tz" defaultValue="Asia/Kolkata" className="mt-2" />
        </Card>
      </div>
    </div>
  );
}
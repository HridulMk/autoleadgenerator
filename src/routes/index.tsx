import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Target, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leadify — Sign in" },
      { name: "description", content: "AI-powered lead intelligence for marketing teams." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex@leadify.io");
  const [password, setPassword] = useState("demo1234");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Target className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">Leadify</span>
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-semibold leading-tight">
            Cold calls,<br />warmed up by AI.
          </h1>
          <p className="max-w-md text-sm text-sidebar-foreground/70">
            Score every prospect, prioritize your day, and close more deals. Your marketing
            team's daily command center.
          </p>
          <div className="grid max-w-md grid-cols-1 gap-3">
            {[
              { icon: Sparkles, t: "AI-ranked daily call list" },
              { icon: TrendingUp, t: "Live conversion analytics" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 px-4 py-3">
                <f.icon className="h-4 w-4 text-primary" />
                <span className="text-sm">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-sidebar-foreground/50">© 2026 Leadify Inc.</div>
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-chart-2/20 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md border-0 bg-transparent p-0 shadow-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to manage your leads and pipeline.
            </p>
          </div>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
            <p className="text-center text-xs text-muted-foreground">
              Demo build — any credentials will sign you in.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { ArrowRight, Play, TrendingUp, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const floatingCards = [
  {
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Revenue Growth",
    value: "+127%",
    sub: "This quarter",
  },
  {
    icon: Users,
    color: "text-brand-500",
    bg: "bg-brand-50",
    title: "New Customers",
    value: "14,280",
    sub: "Last 30 days",
  },
  {
    icon: BarChart3,
    color: "text-accent-500",
    bg: "bg-accent-50",
    title: "Ad ROAS",
    value: "8.4×",
    sub: "Avg. return",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Background mesh gradient */}
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="flex flex-col items-start">
            <Badge variant="brand" className="mb-6 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Trusted by 12,000+ marketers
            </Badge>

            <h1 className="animate-fade-up text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl [animation-delay:100ms]">
              Ads that{" "}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                actually
              </span>{" "}
              convert
            </h1>

            <p className="mt-6 max-w-lg animate-fade-up text-lg leading-relaxed text-slate-500 [animation-delay:200ms]">
              AdBoost supercharges your marketing with AI-powered targeting, real-time analytics,
              and automated optimisation — so you spend less and earn more.
            </p>

            <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-4 [animation-delay:300ms]">
              <Button variant="gradient" size="xl" className="group">
                Start free trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="ghost" size="xl" className="gap-3 text-slate-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                Watch demo
              </Button>
            </div>

            <p className="mt-5 animate-fade-up text-xs text-slate-400 [animation-delay:400ms]">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>

          {/* Right: dashboard preview + floating cards */}
          <div className="relative flex items-center justify-center animate-fade-in [animation-delay:200ms]">
            {/* Dashboard mockup */}
            <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-brand-500/10">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-3 h-5 flex-1 rounded-md bg-slate-100" />
              </div>
              <div className="space-y-3">
                <div className="h-32 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 flex items-center justify-center">
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 75, 100, 85, 110].map((h, i) => (
                      <div
                        key={i}
                        className="w-5 rounded-t-sm bg-gradient-to-t from-brand-600 to-brand-400 opacity-80"
                        style={{ height: `${h * 0.7}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["CTR 4.2%", "CPC $0.34", "ROAS 8.4×"].map((stat) => (
                    <div key={stat} className="rounded-lg bg-slate-50 p-3 text-center">
                      <p className="text-xs font-semibold text-slate-800">{stat}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[80, 60, 90].map((w, i) => (
                    <div key={i} className="h-2.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating metric cards */}
            {floatingCards.map(({ icon: Icon, color, bg, title, value, sub }, i) => (
              <div
                key={title}
                className="absolute animate-float rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xl shadow-slate-900/5"
                style={{
                  animationDelay: `${i * 0.8}s`,
                  ...(i === 0 && { left: "-5%",  top: "8%" }),
                  ...(i === 1 && { right: "-6%", top: "30%" }),
                  ...(i === 2 && { left: "-4%",  bottom: "12%" }),
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-4.5 w-4.5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400">{title}</p>
                    <p className="text-base font-bold text-slate-900">{value}</p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

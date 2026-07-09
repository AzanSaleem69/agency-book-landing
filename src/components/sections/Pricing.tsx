"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "Perfect for small businesses and solo marketers getting started with paid ads.",
    badge: null,
    features: [
      "Up to $10,000 ad spend/mo",
      "3 connected ad accounts",
      "AI bidding optimisation",
      "Unified analytics dashboard",
      "Email support",
      "7-day data history",
    ],
    cta: "Start free trial",
    variant: "secondary" as const,
    highlight: false,
  },
  {
    name: "Growth",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "For fast-growing teams that need automation and advanced analytics at scale.",
    badge: "Most Popular",
    features: [
      "Up to $100,000 ad spend/mo",
      "10 connected ad accounts",
      "AI bidding + audience creation",
      "Creative A/B testing",
      "Multi-channel attribution",
      "Smart alerts & automation rules",
      "Priority support",
      "90-day data history",
    ],
    cta: "Start free trial",
    variant: "gradient" as const,
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 499,
    annualPrice: 399,
    description: "Custom scale, white-glove onboarding, and dedicated strategy for large teams.",
    badge: null,
    features: [
      "Unlimited ad spend",
      "Unlimited ad accounts",
      "Everything in Growth",
      "Custom attribution models",
      "Server-side tracking setup",
      "Dedicated account manager",
      "Custom integrations & API",
      "Unlimited data history",
      "SLA guarantee",
    ],
    cta: "Talk to sales",
    variant: "secondary" as const,
    highlight: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="brand" className="mb-4">Pricing</Badge>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No hidden fees. No percentage of ad spend. Just flat-rate plans that scale with you.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white p-1.5 shadow-sm border border-slate-200">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-semibold transition-all",
                !annual ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all",
                annual ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Annual
              <span className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                annual ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
              )}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map(({ name, monthlyPrice, annualPrice, description, badge, features, cta, variant, highlight }) => (
            <div
              key={name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm",
                highlight && "border-brand-300 shadow-brand-500/10 shadow-xl ring-2 ring-brand-500"
              )}
            >
              {badge && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge variant="brand" className="shadow-sm">
                    <Zap className="h-3 w-3" />
                    {badge}
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
                <div className="mt-5 flex items-end gap-1.5">
                  <span className="text-5xl font-extrabold tabular-nums text-slate-900">
                    ${annual ? annualPrice : monthlyPrice}
                  </span>
                  <span className="mb-1.5 text-slate-400">/mo</span>
                </div>
                {annual && (
                  <p className="mt-1 text-xs text-emerald-600 font-medium">
                    Billed annually (save ${(monthlyPrice - annualPrice) * 12}/yr)
                  </p>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span className="text-sm text-slate-600">{f}</span>
                  </li>
                ))}
              </ul>

              <Button variant={variant} size="lg" className="mt-8 w-full">
                {cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

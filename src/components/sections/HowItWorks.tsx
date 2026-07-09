import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect your channels",
    description:
      "Link Google Ads, Meta, TikTok and more in minutes using our OAuth integrations. No developer required.",
    highlight: "2-minute setup",
  },
  {
    step: "02",
    title: "Set your goal",
    description:
      "Tell AdBoost whether you want conversions, leads, brand awareness, or pure ROAS. We tailor everything to that objective.",
    highlight: "Goal-driven AI",
  },
  {
    step: "03",
    title: "Launch & optimise",
    description:
      "AdBoost continuously tests, learns, and adjusts while you watch performance climb on your live dashboard.",
    highlight: "24/7 automation",
  },
  {
    step: "04",
    title: "Scale what works",
    description:
      "One-click budget scaling for winning campaigns. Export reports, share with clients, and reinvest in growth.",
    highlight: "Instant scaling",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="accent" className="mb-4">How It Works</Badge>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            From zero to optimised in 4 steps
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Start seeing results on day one. Our guided onboarding has you running AI-optimised
            campaigns faster than any other platform.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div className="absolute top-8 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map(({ step, title, description, highlight }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                {/* Step bubble */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-xl font-black text-white shadow-lg shadow-brand-500/30">
                  {step}
                </div>

                <Badge variant="success" className="mb-3 text-[10px]">{highlight}</Badge>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>

                {/* Arrow between steps (desktop only) */}
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-6 hidden h-5 w-5 text-brand-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

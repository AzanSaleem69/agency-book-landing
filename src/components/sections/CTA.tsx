import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const trustPoints = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
  "SOC 2 certified",
];

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 py-24">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ShieldCheck className="mx-auto mb-6 h-12 w-12 text-white/60" />
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Ready to 10× your ad results?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-brand-100">
          Join 12,000+ businesses already using AdBoost to spend smarter, target better, and grow faster.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="outline" size="xl" className="group w-full sm:w-auto">
            Start your free trial
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="ghost" size="xl" className="text-white/80 hover:bg-white/10 hover:text-white w-full sm:w-auto">
            Schedule a demo
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustPoints.map((point) => (
            <span key={point} className="flex items-center gap-1.5 text-sm text-brand-200">
              <span className="h-1 w-1 rounded-full bg-brand-300" />
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

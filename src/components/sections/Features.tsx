import {
  Brain,
  BarChart2,
  Target,
  Layers,
  Bell,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Optimisation",
    description:
      "Our machine-learning engine analyses millions of signals in real-time to automatically adjust bids, creatives, and targeting for maximum ROAS.",
    badge: "AI",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: BarChart2,
    title: "Unified Analytics Dashboard",
    description:
      "See every channel — Google, Meta, TikTok, LinkedIn — in a single, beautiful dashboard. No more tab-switching or manual CSV exports.",
    badge: "Analytics",
    color: "bg-brand-100 text-brand-600",
  },
  {
    icon: Target,
    title: "Precision Audience Targeting",
    description:
      "Build hyper-specific audiences using first-party data, lookalikes, and behavioural signals that your competitors don't have access to.",
    badge: "Targeting",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Layers,
    title: "Creative A/B Testing",
    description:
      "Launch dozens of ad variants at once and let our system identify winners in hours, not weeks. Iterate faster than ever before.",
    badge: "Testing",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Bell,
    title: "Smart Alerts & Automation",
    description:
      "Set performance rules and let AdBoost act on your behalf. Pause under-performers, scale winners, and get Slack/email alerts instantly.",
    badge: "Automation",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Multi-Channel Attribution",
    description:
      "Understand the true customer journey with server-side tracking and multi-touch attribution models — GA4, custom, or data-driven.",
    badge: "Attribution",
    color: "bg-sky-100 text-sky-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="brand" className="mb-4">Features</Badge>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need to dominate ads
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            From AI bidding to creative testing, AdBoost packs the full marketing stack into one
            intuitive platform.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, badge, color }) => (
            <Card key={title} hover className="group">
              <CardContent>
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <Badge variant="neutral" className="mb-3 text-[10px]">{badge}</Badge>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Velocity Commerce",
    avatar: "SC",
    avatarColor: "from-pink-400 to-rose-500",
    rating: 5,
    quote:
      "AdBoost cut our CPL by 43% in the first month. The AI bidding is genuinely something else — it found audiences we never would have discovered manually.",
  },
  {
    name: "Marcus Okafor",
    role: "Founder & CEO",
    company: "LaunchPad SaaS",
    avatar: "MO",
    avatarColor: "from-blue-400 to-brand-600",
    rating: 5,
    quote:
      "We scaled from $5k to $50k monthly ad spend without adding a single person to our marketing team. AdBoost's automation handles everything.",
  },
  {
    name: "Elena Rossi",
    role: "Performance Marketing Manager",
    company: "Luxe Retail Group",
    avatar: "ER",
    avatarColor: "from-amber-400 to-orange-500",
    rating: 5,
    quote:
      "The multi-channel attribution finally gave us clarity on what's actually driving revenue. We reallocated $30k of budget to the right channels immediately.",
  },
  {
    name: "James Park",
    role: "VP Marketing",
    company: "FinEdge",
    avatar: "JP",
    avatarColor: "from-emerald-400 to-teal-500",
    rating: 5,
    quote:
      "Best dashboard I've ever used. I can see our entire ad portfolio health at a glance and get alerted before problems become expensive.",
  },
  {
    name: "Priya Nair",
    role: "Digital Marketing Lead",
    company: "HealthFirst",
    avatar: "PN",
    avatarColor: "from-violet-400 to-accent-500",
    rating: 5,
    quote:
      "The creative A/B testing is a game-changer. We identified our winning video ad in 3 days versus the 3 weeks it used to take us.",
  },
  {
    name: "Tom Wilkins",
    role: "E-commerce Director",
    company: "Outdoor Gear Co.",
    avatar: "TW",
    avatarColor: "from-sky-400 to-blue-500",
    rating: 5,
    quote:
      "ROI of 11× on our peak season campaigns. The AI scaled budgets on winning products automatically while we slept. Genuinely impressive.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="success" className="mb-4">Customer Stories</Badge>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Loved by growth teams worldwide
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Over 12,000 businesses trust AdBoost to power their marketing. Here's what some of them
            have to say.
          </p>
        </div>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map(({ name, role, company, avatar, avatarColor, rating, quote }) => (
            <Card key={name} hover className="mb-6 break-inside-avoid">
              <StarRating count={rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">
                "{quote}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor} text-xs font-bold text-white`}
                >
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400">{role} · {company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

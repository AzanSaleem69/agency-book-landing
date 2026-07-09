"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does it take to set up AdBoost?",
    a: "Most customers are fully set up and running their first AI-optimised campaign within 20 minutes. Our guided onboarding connects your ad accounts, imports your historical data, and launches your first rule sets automatically.",
  },
  {
    q: "Which ad platforms do you support?",
    a: "AdBoost currently supports Google Ads, Meta (Facebook & Instagram), TikTok Ads, LinkedIn Ads, Snapchat Ads, Pinterest Ads, and Microsoft Advertising (Bing). More platforms are added regularly.",
  },
  {
    q: "Do you charge a percentage of my ad spend?",
    a: "Never. AdBoost is flat-rate only — you pay a fixed monthly fee regardless of how much you spend on ads. This means our incentives are perfectly aligned: we want to help you spend smarter, not just more.",
  },
  {
    q: "Is my advertising data safe and private?",
    a: "Absolutely. Your data is encrypted at rest and in transit using AES-256 and TLS 1.3. We never sell or share your data with third parties. We are SOC 2 Type II certified and GDPR compliant.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. There are no lock-in contracts. You can cancel your subscription at any time from your account settings and you won't be charged again. Annual plan refunds are prorated.",
  },
  {
    q: "Do you offer an agency or white-label plan?",
    a: "Yes! Our Agency tier (starting at $799/mo) allows you to manage unlimited client accounts from a single dashboard, with client-facing reports, custom branding, and dedicated agency support.",
  },
  {
    q: "How does the AI bidding actually work?",
    a: "Our proprietary bidding engine ingests your first-party conversion data, competitive signals, and 500+ contextual features to predict the probability of conversion for each impression. It then bids in real-time to acquire only the impressions most likely to convert at your target CPA or ROAS.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="neutral" className="mb-4">FAQ</Badge>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Questions? We've got answers.
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Can't find what you're looking for?{" "}
            <a href="#" className="font-semibold text-brand-600 underline-offset-2 hover:underline">
              Chat with our team.
            </a>
          </p>
        </div>

        <div className="mt-12 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
          {faqs.map(({ q, a }, i) => (
            <div key={q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-slate-900">{q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                    open === i && "rotate-180 text-brand-500"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-slate-500">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

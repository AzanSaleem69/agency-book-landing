"use client";

import { useInView } from "react-intersection-observer";
import { Crosshair, Link2, Search, Megaphone, type LucideIcon } from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

// ─── card data ────────────────────────────────────────────────────────────────
const channels: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon:  Crosshair,
    title: "Outbound Prospecting",
    body:  "Direct outreach that gets you in front of decision-makers. No spam, no mass automation, no burning bridges with people you actually want to work with.",
  },
  {
    icon:  Link2,
    title: "Referral Systems",
    body:  "Turn your best clients into a referral engine that runs on its own. Warm introductions should come in regularly, not just when you happen to get lucky.",
  },
  {
    icon:  Search,
    title: "SEO as a Growth Channel",
    body:  "Your agency's own SEO can generate leads around the clock. Most agencies skip this entirely and wonder why their pipeline dries up between projects.",
  },
  {
    icon:  Megaphone,
    title: "Paid Advertising",
    body:  "Paid campaigns built for service businesses specifically. Not e-commerce frameworks someone repackaged and sold as a universal solution.",
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function LeadSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: cardsRef, inView: cardsIn } = useInView({ triggerOnce: true, threshold: 0.1  });
  const { ref: stripRef, inView: stripIn } = useInView({ triggerOnce: true, threshold: 0.35 });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── header ── */
        @keyframes ld-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ld-head-item { opacity: 0; }
        .ld-head-item.ld-in {
          animation: ld-fade-up 0.6s ease-out both;
        }
        .ld-hd1.ld-in { animation-delay: 0.05s; }
        .ld-hd2.ld-in { animation-delay: 0.18s; }
        .ld-hd3.ld-in { animation-delay: 0.30s; }

        /*
         * Horizontal icon-band layout — deliberately un-card-like, to break
         * up the run of boxed-card grids used by the sections around it.
         */
        .ld-wrap {
          opacity: 0;
          transform: translateY(28px);
        }
        .ld-wrap.ld-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity   0.55s ease-out var(--d, 0s),
            transform 0.55s ease-out var(--d, 0s);
        }

        .ld-icon {
          background:    #ffffff;
          border:        2px solid rgba(201,168,76,0.4);
          transition:    border-color 0.22s ease, transform 0.22s ease, background 0.22s ease;
        }
        .ld-item:hover .ld-icon {
          border-color: ${GOLD};
          background:   rgba(201,168,76,0.08);
          transform:    translateY(-3px);
        }

        .ld-line {
          position: absolute;
          top: 28px;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0,0,37,0.08);
        }

        /* ── diagonal shape at bottom of white area ── */
        .ld-diagonal-bridge {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        .ld-diagonal-bridge svg {
          display: block;
          width: 100%;
        }

        /* ── bottom navy strip slides up ── */
        @keyframes ld-strip-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ld-strip { opacity: 0; }
        .ld-strip.ld-in {
          animation: ld-strip-up 0.65s ease-out both;
        }
      `}</style>

      <section
        className="overflow-hidden bg-white pb-0 pt-24 sm:pt-28"
        aria-label="Lead generation channels"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p
              className={`ld-head-item ld-hd1 ${headIn ? "ld-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              Chapter Spotlight
            </p>

            <h2
              className={`ld-head-item ld-hd2 ${headIn ? "ld-in" : ""} mb-5 f-h2 font-bold tracking-tight`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              Most Agencies Wait for Referrals. The Ones That Scale Don't Wait for Anything.
            </h2>

            <p
              className={`ld-head-item ld-hd3 ${headIn ? "ld-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "#6B6B80" }}
            >
              No pipeline, no agency. This section covers the four channels that actually bring in clients for service businesses, with a specific approach for each one.
            </p>
          </div>

          {/* ── Horizontal icon band ────────────────────────────────── */}
          <div ref={cardsRef} className="relative">
            <div className="ld-line hidden lg:block" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
              {channels.map(({ icon: Icon, title, body }, i) => (
                <div
                  key={title}
                  className={`ld-wrap ${cardsIn ? "ld-in" : ""} ld-item flex flex-col items-center text-center`}
                  style={{ "--d": `${i * 0.12}s` } as React.CSSProperties}
                >
                  {/* Icon circle — sits on the connecting line */}
                  <div
                    className="ld-icon relative z-10 mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: GOLD }}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 text-[15px] font-bold leading-snug sm:text-[16px]"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h3>

                  {/* Body */}
                  <p className="max-w-[220px] text-[13px] leading-relaxed sm:text-[14px]" style={{ color: "#6B6B80" }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Diagonal bridge + full-width navy strip ──────────────── */}
        {/* SVG diagonal separator — full viewport width */}
        <div className="ld-diagonal-bridge mt-16" aria-hidden="true">
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="0,52 1440,0 1440,52" fill={NAVY} />
          </svg>
        </div>

        {/* Navy strip */}
        <div
          ref={stripRef}
          className={`ld-strip ${stripIn ? "ld-in" : ""}`}
          style={{ backgroundColor: NAVY }}
        >
          <div className="mx-auto max-w-2xl px-4 pb-20 pt-10 text-center sm:px-6 lg:px-8">
            {/* Bold statement */}
            <p
              className="mb-3 text-[26px] font-bold leading-snug sm:text-3xl"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-playfair)" }}
            >
              Bad clients cost more than no clients.
              <br className="hidden sm:block" /> This book shows you how to stop attracting them.
            </p>

            {/* Gold subtext */}
            <p
              className="mb-8 text-[15px] font-medium"
              style={{ color: GOLD }}
            >
              Build a lead engine that brings in the right work, consistently, on your terms.
            </p>

            {/* CTA */}
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl px-9 py-4 text-[15px] font-black tracking-wide transition-opacity hover:opacity-90"
              style={{
                backgroundColor: GOLD,
                color:           NAVY,
                boxShadow:       "0 8px 24px rgba(201,168,76,0.25)",
              }}
            >
              Build My Pipeline for $9.99
            </a>
          </div>
        </div>

      </section>
    </>
  );
}

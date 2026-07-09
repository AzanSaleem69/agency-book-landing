"use client";

import { useInView } from "react-intersection-observer";
import { Star, ShoppingCart, BookOpen } from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD  = "#C9A84C";
const NAVY  = "#000025";
const BG    = "#000D30";

// ─── data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "I restructured my entire retainer model after chapter 11. Clients stopped negotiating on price — they started asking when we could start. That one chapter paid for itself a hundred times over.",
    name:  "Marcus T.",
    title: "Founder, Digital Marketing Agency — UK",
  },
  {
    quote:
      "I've bought courses at £2,000 that gave me less than this £19 book. The SSS framework alone changed how I pitch, how I package, and how I close. My average deal size went up 40% in 3 months.",
    name:  "Sarah K.",
    title: "SEO Agency Owner — Canada",
  },
  {
    quote:
      "We were stuck at the same revenue for 18 months. The scaling section completely changed how we structured our team and our delivery. Within 60 days our client retention rate went from 62% to 89%.",
    name:  "James O.",
    title: "Growth Agency Director — UAE",
  },
];

const trustButtons = [
  { icon: BookOpen,     label: "Amazon — Kindle Edition"    },
  { icon: ShoppingCart, label: "Amazon — Paperback Edition" },
];

// ─── star rating ──────────────────────────────────────────────────────────────
function FiveStars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-[18px] w-[18px]"
          style={{ fill: GOLD, color: GOLD }}
        />
      ))}
    </div>
  );
}

// ─── component ────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: cardsRef, inView: cardsIn } = useInView({ triggerOnce: true, threshold: 0.12 });
  const { ref: barRef,   inView: barIn   } = useInView({ triggerOnce: true, threshold: 0.4  });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── header ── */
        @keyframes ts-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ts-head-item { opacity: 0; }
        .ts-head-item.ts-in {
          animation: ts-fade-up 0.6s ease-out both;
        }
        .ts-hd1.ts-in { animation-delay: 0.05s; }
        .ts-hd2.ts-in { animation-delay: 0.18s; }
        .ts-hd3.ts-in { animation-delay: 0.30s; }

        /*
         * Two-layer card approach:
         *   .ts-wrap  — entrance (opacity + translateY with stagger)
         *   .ts-card  — hover (scale + shadow, zero delay)
         */
        .ts-wrap {
          opacity: 0;
          transform: translateY(30px);
        }
        .ts-wrap.ts-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity   0.58s ease-out var(--d, 0s),
            transform 0.58s ease-out var(--d, 0s);
        }

        .ts-card {
          background:    #ffffff;
          border-radius: 16px;
          padding:       2rem;
          height:        100%;
          box-shadow:    0 2px 16px rgba(0,0,37,0.06), 0 1px 4px rgba(0,0,37,0.04);
          transition:    transform 0.25s ease, box-shadow 0.25s ease;
          position:      relative;
          overflow:      hidden;
        }
        .ts-card:hover {
          transform:  scale(1.02);
          box-shadow: 0 24px 56px rgba(0,0,37,0.12), 0 6px 16px rgba(0,0,37,0.06);
        }

        /*
         * Quote mark fades in at the same time as the card entrance,
         * card body content fades in 0.1s later.
         * Both use calc() to offset from the parent card's delay.
         */
        @keyframes ts-qmark-in {
          from { opacity: 0; transform: scale(0.65) translateY(-6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .ts-qmark { opacity: 0; }
        .ts-qmark.ts-in {
          animation: ts-qmark-in 0.45s cubic-bezier(0.34,1.56,0.64,1) var(--d, 0s) both;
        }

        @keyframes ts-body-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .ts-body { opacity: 0; }
        .ts-body.ts-in {
          /* fires 0.1s after the quote mark */
          animation: ts-body-in 0.45s ease-out calc(var(--d, 0s) + 0.1s) both;
        }

        /* ── trust bar ── */
        .ts-bar { opacity: 0; }
        .ts-bar.ts-in {
          animation: ts-fade-up 0.55s ease-out 0.1s both;
        }

        /* Trust buttons */
        .ts-trust-btn {
          display:         inline-flex;
          align-items:     center;
          gap:             0.5rem;
          border:          1.5px solid rgba(255,255,255,0.22);
          border-radius:   10px;
          padding:         0.6rem 1.25rem;
          font-size:       13px;
          font-weight:     700;
          color:           rgba(255,255,255,0.8);
          background:      transparent;
          transition:      border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .ts-trust-btn:hover {
          border-color: ${GOLD};
          background:   rgba(201,168,76,0.1);
          color:        ${GOLD};
        }
      `}</style>

      <section
        style={{ backgroundColor: BG }}
        className="py-24 sm:py-28"
        aria-label="Testimonials"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p
              className={`ts-head-item ts-hd1 ${headIn ? "ts-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              Reader Results
            </p>

            <h2
              className={`ts-head-item ts-hd2 ${headIn ? "ts-in" : ""} mb-5 text-[36px] font-bold leading-[1.08] tracking-tight sm:text-5xl`}
              style={{ color: "#FFFFFF", fontFamily: "var(--font-playfair)" }}
            >
              Agency Owners Who've Read It.
            </h2>

            <p
              className={`ts-head-item ts-hd3 ${headIn ? "ts-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Real feedback from practitioners — not influencer endorsements.
            </p>
          </div>

          {/* ── Cards row ───────────────────────────────────────────── */}
          <div
            ref={cardsRef}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map(({ quote, name, title }, i) => (
              <div
                key={i}
                className={`ts-wrap ${cardsIn ? "ts-in" : ""}`}
                style={{ "--d": `${i * 0.15}s` } as React.CSSProperties}
              >
                <div className="ts-card">

                  {/* Decorative large gold opening quote — animates first */}
                  <div
                    className={`ts-qmark ${cardsIn ? "ts-in" : ""}`}
                    style={{ "--d": `${i * 0.15}s` } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    <span
                      className="block leading-none"
                      style={{
                        color:      GOLD,
                        fontSize:   "72px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        lineHeight: 0.75,
                        marginBottom: "12px",
                        opacity:    0.85,
                      }}
                    >
                      &ldquo;
                    </span>
                  </div>

                  {/* Card body — stars + quote + attribution */}
                  <div
                    className={`ts-body ${cardsIn ? "ts-in" : ""}`}
                    style={{ "--d": `${i * 0.15}s` } as React.CSSProperties}
                  >
                    {/* 5 stars */}
                    <div className="mb-4">
                      <FiveStars />
                    </div>

                    {/* Quote text */}
                    <blockquote
                      className="mb-6 text-[15px] leading-relaxed"
                      style={{ color: "#4A4A5C" }}
                    >
                      {quote}
                    </blockquote>

                    {/* Thin separator */}
                    <div
                      className="mb-4 h-px"
                      style={{ background: "rgba(0,0,37,0.08)" }}
                      aria-hidden="true"
                    />

                    {/* Attribution */}
                    <p
                      className="text-[14px] font-bold"
                      style={{ color: NAVY }}
                    >
                      {name}
                    </p>
                    <p
                      className="mt-0.5 text-[12px] font-semibold"
                      style={{ color: GOLD }}
                    >
                      {title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Trust / availability bar ────────────────────────────── */}
          <div
            ref={barRef}
            className={`ts-bar ${barIn ? "ts-in" : ""} mt-14`}
          >
            {/* Separator */}
            <div
              className="mb-8 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
              aria-hidden="true"
            />

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              {/* Label */}
              <p
                className="text-[12px] font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Now Available On
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {trustButtons.map(({ icon: Icon, label }) => (
                  <button key={label} className="ts-trust-btn">
                    <Icon className="h-4 w-4 shrink-0" style={{ color: GOLD }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

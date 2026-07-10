"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, X, Star, Quote } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#000025";
const BG   = "#000D30";

// ─── review data ──────────────────────────────────────────────────────────────
const reviews = [
  {
    name:     "Marcus T.",
    handle:   "@marcus_agency",
    location: "London, UK",
    initials: "MT",
    color:    "#1DA1F2",
    platform: "Twitter / X",
    stars:    5,
    date:     "Mar 2026",
    quote:    "Went from £4K months to closing a £22K retainer in 6 weeks using the positioning framework in Chapter 7. This isn't theory — it's a literal operations manual.",
    tag:      "Agency Owner · 20+ Clients",
  },
  {
    name:     "Sarah K.",
    handle:   "@sarahk_digital",
    location: "Toronto, Canada",
    initials: "SK",
    color:    "#E91E63",
    platform: "Google Review",
    stars:    5,
    date:     "Apr 2026",
    quote:    "I've read 12 books on agency growth. This is the only one I've read twice. The client retention chapter alone saved me from losing a £15K/month account.",
    tag:      "Digital Agency Founder",
  },
  {
    name:     "James O.",
    handle:   "@james_scales",
    location: "Dubai, UAE",
    initials: "JO",
    color:    "#FF9800",
    platform: "LinkedIn",
    stars:    5,
    date:     "May 2026",
    quote:    "Chapter 14 on packaging completely changed how I price. Went from £1,500 projects to £8,000 retainers without changing the actual work. Just the framing.",
    tag:      "Creative Agency · UAE",
  },
  {
    name:     "Priya M.",
    handle:   "@priya_mktg",
    location: "Singapore",
    initials: "PM",
    color:    "#9C27B0",
    platform: "Twitter / X",
    stars:    5,
    date:     "May 2026",
    quote:    "The hiring and onboarding section is worth 10x the price alone. Built my first real team of 4 using these exact frameworks. Zero drama, all delivery.",
    tag:      "Performance Marketing Agency",
  },
  {
    name:     "Ryan B.",
    handle:   "@ryanbuild",
    location: "Austin, TX",
    initials: "RB",
    color:    "#4CAF50",
    platform: "Google Review",
    stars:    5,
    date:     "Jun 2026",
    quote:    "I was doing $8K months working 70-hour weeks. After implementing the systems in Part 3, I'm at $31K/month working 40 hours. The scale section is genuinely life-changing.",
    tag:      "SEO & Content Agency",
  },
  {
    name:     "Lena W.",
    handle:   "@lenawrites",
    location: "Berlin, Germany",
    initials: "LW",
    color:    "#F44336",
    platform: "LinkedIn",
    stars:    5,
    date:     "Jun 2026",
    quote:    "Most agency books recycle the same advice. This one actually tells you what to DO on Monday morning. The proposal framework in Chapter 12 closed my biggest deal.",
    tag:      "Content & Brand Agency",
  },
];

// ─── star row ─────────────────────────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" style={{ color: GOLD }} />
      ))}
    </div>
  );
}

// ─── single card ──────────────────────────────────────────────────────────────
function ReviewCard({
  r, onClick, active,
}: {
  r: typeof reviews[0];
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div
      className="ts-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick()}
      aria-label={`Review by ${r.name} — click to expand`}
      style={{ "--accent": r.color } as React.CSSProperties}
    >
      {/* Platform badge */}
      <div className="ts-platform-badge">
        <span className="ts-platform-dot" style={{ background: r.color }} />
        {r.platform}
      </div>

      {/* Quote icon */}
      <div className="ts-quote-icon">
        <Quote className="h-6 w-6" style={{ color: GOLD, opacity: 0.45 }} />
      </div>

      {/* Stars */}
      <div className="mb-3">
        <Stars n={r.stars} />
      </div>

      {/* Review text */}
      <p className="ts-review-text">&ldquo;{r.quote}&rdquo;</p>

      {/* Author row */}
      <div className="ts-author-row">
        <div
          className="ts-avatar"
          style={{ background: r.color }}
          aria-hidden="true"
        >
          {r.initials}
        </div>
        <div className="flex flex-col">
          <span className="ts-name">{r.name}</span>
          <span className="ts-handle">{r.handle}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="ts-footer">
        <span style={{ color: "rgba(255,255,255,0.3)" }}>{r.location}</span>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>{r.date}</span>
      </div>

      {/* Expand hint */}
      <div className="ts-expand-hint">Click to expand</div>
    </div>
  );
}

// ─── lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  r,
  onClose,
}: {
  r: typeof reviews[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="ts-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Review detail"
    >
      <div
        className="ts-lightbox-card"
        onClick={e => e.stopPropagation()}
        style={{ "--accent": r.color } as React.CSSProperties}
      >
        {/* Close */}
        <button className="ts-close-btn" onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        {/* Platform */}
        <div className="ts-platform-badge mb-4">
          <span className="ts-platform-dot" style={{ background: r.color }} />
          {r.platform}
        </div>

        {/* Stars */}
        <div className="mb-4">
          <Stars n={r.stars} />
        </div>

        {/* Quote */}
        <p
          className="mb-8 text-[18px] font-semibold leading-relaxed sm:text-[20px]"
          style={{ color: "#fff" }}
        >
          &ldquo;{r.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="ts-author-row mb-4">
          <div className="ts-avatar ts-avatar-lg" style={{ background: r.color }}>
            {r.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] font-black text-white">{r.name}</span>
            <span style={{ color: GOLD, fontSize: "13px" }}>{r.handle}</span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>
              {r.tag}
            </span>
          </div>
        </div>

        <div className="ts-footer">
          <span style={{ color: "rgba(255,255,255,0.35)" }}>{r.location}</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>{r.date}</span>
        </div>
      </div>
    </div>
  );
}

// ─── main section ─────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { ref: headRef, inView: headIn } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [current,  setCurrent]  = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);

  const total   = reviews.length;
  const visible = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  // Touch / mouse drag
  const onDragStart = (x: number) => { dragStart.current = x; setDragging(false); };
  const onDragEnd   = (x: number) => {
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
  };

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  // Get 3 visible indices (wrap-around)
  const indices = Array.from({ length: 3 }, (_, i) => (current + i) % total);

  return (
    <>
      <style>{`
        /* ── header ── */
        @keyframes ts-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ts-hd { opacity: 0; }
        .ts-hd.ts-in { animation: ts-fade-up 0.6s ease-out both; }
        .ts-hd1.ts-in { animation-delay: 0.05s; }
        .ts-hd2.ts-in { animation-delay: 0.18s; }
        .ts-hd3.ts-in { animation-delay: 0.30s; }

        /* ── card ── */
        .ts-card {
          position:       relative;
          background:     linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border:         1px solid rgba(255,255,255,0.1);
          border-top:     2px solid var(--accent, ${GOLD});
          border-radius:  16px;
          padding:        28px 24px 20px;
          cursor:         pointer;
          height:         100%;
          display:        flex;
          flex-direction: column;
          gap:            0;
          transition:     transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          overflow:       hidden;
          user-select:    none;
        }
        .ts-card:hover {
          transform:  translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2);
          border-top-color: ${GOLD};
        }

        /* Platform badge */
        .ts-platform-badge {
          display:        inline-flex;
          align-items:    center;
          gap:            6px;
          background:     rgba(255,255,255,0.07);
          border:         1px solid rgba(255,255,255,0.1);
          border-radius:  20px;
          padding:        4px 10px;
          font-size:      11px;
          font-weight:    700;
          color:          rgba(255,255,255,0.6);
          margin-bottom:  16px;
          width:          fit-content;
        }
        .ts-platform-dot {
          width:         8px;
          height:        8px;
          border-radius: 50%;
          flex-shrink:   0;
        }

        /* Quote icon */
        .ts-quote-icon {
          position:  absolute;
          top:       16px;
          right:     18px;
        }

        /* Review text */
        .ts-review-text {
          flex:         1;
          font-size:    14px;
          line-height:  1.75;
          color:        rgba(255,255,255,0.82);
          margin-bottom: 20px;
        }

        /* Author */
        .ts-author-row {
          display:     flex;
          align-items: center;
          gap:         12px;
          margin-bottom: 14px;
        }
        .ts-avatar {
          width:         40px;
          height:        40px;
          border-radius: 50%;
          display:       flex;
          align-items:   center;
          justify-content: center;
          font-size:     14px;
          font-weight:   900;
          color:         #fff;
          flex-shrink:   0;
        }
        .ts-avatar-lg {
          width:  56px;
          height: 56px;
          font-size: 18px;
        }
        .ts-name {
          font-size:   15px;
          font-weight: 800;
          color:       #ffffff;
          line-height: 1.2;
        }
        .ts-handle {
          font-size: 12px;
          color:     ${GOLD};
          opacity:   0.8;
        }

        /* Footer */
        .ts-footer {
          display:         flex;
          justify-content: space-between;
          font-size:       11px;
          padding-top:     12px;
          border-top:      1px solid rgba(255,255,255,0.07);
        }

        /* Expand hint */
        .ts-expand-hint {
          position:   absolute;
          bottom:     0;
          left:       0;
          right:      0;
          background: linear-gradient(to top, rgba(0,0,37,0.9) 0%, transparent 100%);
          text-align: center;
          padding:    24px 0 10px;
          font-size:  11px;
          font-weight: 700;
          color:      ${GOLD};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity:    0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .ts-card:hover .ts-expand-hint { opacity: 1; }

        /* ── Nav arrows ── */
        .ts-arrow {
          display:          flex;
          align-items:      center;
          justify-content:  center;
          width:            44px;
          height:           44px;
          border-radius:    50%;
          border:           2px solid rgba(201,168,76,0.4);
          background:       rgba(201,168,76,0.06);
          color:            ${GOLD};
          cursor:           pointer;
          flex-shrink:      0;
          transition:       background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .ts-arrow:hover {
          background:   rgba(201,168,76,0.18);
          border-color: ${GOLD};
          transform:    scale(1.08);
        }

        /* ── Dots ── */
        .ts-dot {
          width:         8px;
          height:        8px;
          border-radius: 50%;
          background:    rgba(255,255,255,0.18);
          transition:    background 0.3s ease, transform 0.3s ease;
          cursor:        pointer;
        }
        .ts-dot.ts-active {
          background: ${GOLD};
          transform:  scale(1.3);
        }

        /* ── Lightbox ── */
        .ts-lightbox-overlay {
          position:        fixed;
          inset:           0;
          z-index:         900;
          background:      rgba(0,0,0,0.82);
          backdrop-filter: blur(8px);
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         20px;
          animation:       ts-overlay-in 0.22s ease-out;
        }
        @keyframes ts-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .ts-lightbox-card {
          position:      relative;
          background:    ${BG};
          border:        1px solid rgba(255,255,255,0.12);
          border-top:    3px solid var(--accent, ${GOLD});
          border-radius: 20px;
          padding:       36px 32px 28px;
          max-width:     540px;
          width:         100%;
          animation:     ts-card-in 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes ts-card-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        .ts-close-btn {
          position:        absolute;
          top:             14px;
          right:           14px;
          width:           32px;
          height:          32px;
          border-radius:   50%;
          background:      rgba(255,255,255,0.08);
          border:          1px solid rgba(255,255,255,0.12);
          color:           rgba(255,255,255,0.7);
          display:         flex;
          align-items:     center;
          justify-content: center;
          cursor:          pointer;
          transition:      background 0.2s ease;
        }
        .ts-close-btn:hover { background: rgba(255,255,255,0.16); }
      `}</style>

      <section
        style={{ backgroundColor: BG }}
        className="overflow-hidden py-24 sm:py-28"
        aria-label="Reader reviews"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p className={`ts-hd ts-hd1 ${headIn ? "ts-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}>
              What Readers Are Saying
            </p>
            <h2 className={`ts-hd ts-hd2 ${headIn ? "ts-in" : ""} mb-5 text-[34px] font-bold leading-tight tracking-tight text-white sm:text-5xl`}
              style={{ fontFamily: "var(--font-playfair)" }}>
              Agency Owners Who Changed the Game
            </h2>
            <p className={`ts-hd ts-hd3 ${headIn ? "ts-in" : ""} text-[16px] leading-relaxed`}
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Real results from real operators across 12+ countries.
              Click any card to read in full.
            </p>
          </div>

          {/* ── Carousel ──────────────────────────────────────── */}
          <div
            className="flex items-stretch gap-5"
            onMouseDown={e => onDragStart(e.clientX)}
            onMouseUp={e  => onDragEnd(e.clientX)}
            onTouchStart={e => onDragStart(e.touches[0].clientX)}
            onTouchEnd={e   => onDragEnd(e.changedTouches[0].clientX)}
          >
            {/* Left arrow */}
            <button
              className="ts-arrow self-center hidden sm:flex"
              onClick={prev}
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Cards — 1 on mobile, 3 on md+ */}
            <div className="flex-1 grid grid-cols-1 gap-5 md:grid-cols-3">
              {indices.map((idx, pos) => (
                <ReviewCard
                  key={`${idx}-${pos}`}
                  r={reviews[idx]}
                  active={pos === 1}
                  onClick={() => setLightbox(idx)}
                />
              ))}
            </div>

            {/* Right arrow */}
            <button
              className="ts-arrow self-center hidden sm:flex"
              onClick={next}
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile arrows */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
            <button className="ts-arrow" onClick={prev} aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="ts-arrow" onClick={next} aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* ── Dot indicators ───────────────────────────────── */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`ts-dot ${i === current ? "ts-active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* ── Trust row ─────────────────────────────────────── */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { n: "500+",  l: "Copies Sold"         },
              { n: "12+",   l: "Countries"            },
              { n: "4.9★",  l: "Average Rating"       },
              { n: "100%",  l: "One-Time Payment"     },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center gap-0.5">
                <span className="text-[22px] font-black" style={{ color: GOLD }}>{n}</span>
                <span className="text-[12px] font-medium uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.38)" }}>{l}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {lightbox !== null && (
        <Lightbox r={reviews[lightbox]} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

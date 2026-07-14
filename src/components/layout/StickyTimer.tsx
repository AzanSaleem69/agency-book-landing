"use client";

import { useState, useEffect, useRef } from "react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD  = "#C9A84C";
const NAVY  = "#000025";
const TOTAL = 15 * 60 * 60; // 15 hours in seconds

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ─── component ────────────────────────────────────────────────────────────────
export function StickyTimer() {
  const [secs,      setSecs]      = useState(TOTAL);
  const [visible,   setVisible]   = useState(false);
  const [pulse,     setPulse]     = useState(false);
  const [barHeight, setBarHeight] = useState(64);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => {
        if (s <= 1) {
          setPulse(true);
          setTimeout(() => setPulse(false), 700);
          return TOTAL;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Keep the spacer in sync with the bar's real height (it changes
  // between the stacked mobile/tablet layout and the single-row desktop one).
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setBarHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const days  = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins  = Math.floor((secs % 3600) / 60);
  const sec   = secs % 60;

  // Last 24 hrs — digits shift to red
  const isUrgent = days === 0;

  return (
    <>
      <style>{`
        .st-bar {
          position:      fixed;
          inset-x:       0;
          top:           0;
          z-index:       300;
          width:         100%;
          background:    ${NAVY};
          border-bottom: 1.5px solid rgba(201,168,76,0.25);
          box-shadow:    0 4px 28px rgba(0,0,0,0.5);
          transform:     translateY(-110%);
          transition:    transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .st-bar.st-on { transform: translateY(0); }

        /* ── digit box ── */
        .st-box {
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          background:      rgba(201,168,76,0.1);
          border:          1px solid rgba(201,168,76,0.3);
          border-radius:   6px;
          padding:         3px 10px 2px;
          min-width:       46px;
          transition:      background 0.3s ease, border-color 0.3s ease;
        }
        .st-box.st-urgent { background: rgba(220,50,50,0.15); border-color: rgba(220,50,50,0.45); }
        .st-box.st-pulse  { background: rgba(220,50,50,0.32); }

        .st-num {
          font-size:            21px;
          font-weight:          900;
          line-height:          1;
          font-variant-numeric: tabular-nums;
          letter-spacing:       0.02em;
          color:                ${GOLD};
          transition:           color 0.3s ease;
        }
        .st-num.st-urgent { color: #FF6060; }

        .st-lbl {
          font-size:      8px;
          font-weight:    700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color:          rgba(201,168,76,0.52);
          margin-top:     2px;
        }
        .st-lbl.st-urgent { color: rgba(255,96,96,0.6); }

        .st-sep {
          font-size:    20px;
          font-weight:  900;
          color:        rgba(201,168,76,0.4);
          margin:       0 2px;
          padding-bottom: 10px;
          align-self:   center;
        }

        /* ── CTA ── */
        .st-cta {
          display:         inline-block;
          background:      ${GOLD};
          color:           ${NAVY};
          border-radius:   8px;
          padding:         9px 22px;
          font-size:       13px;
          font-weight:     900;
          letter-spacing:  0.04em;
          white-space:     nowrap;
          text-decoration: none;
          flex-shrink:     0;
          box-shadow:      0 4px 16px rgba(201,168,76,0.32);
          transition:      opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .st-cta:hover {
          opacity:    0.88;
          transform:  translateY(-1px);
          box-shadow: 0 8px 22px rgba(201,168,76,0.48);
        }

        /* ── blinking "Hurry Up!" ── */
        @keyframes st-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .st-hurry { animation: st-blink 1.3s ease-in-out infinite; }
      `}</style>

      {/* ── Full-width sticky bar ───────────────────────────────────── */}
      <div
        ref={barRef}
        className={`st-bar ${visible ? "st-on" : ""}`}
        role="banner"
        aria-label="Limited time offer"
      >
        {/*
         * Below `lg` (tablet + mobile): stacked 2-row layout —
         *   row 1: "Hurry Up! Hurry — price resets at zero!"
         *   row 2: timer + CTA button
         * At `lg` and up: everything back on a single 64px-tall row.
         */}
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2.5 px-4 py-3 sm:px-8 lg:h-[64px] lg:flex-row lg:justify-between lg:gap-0 lg:py-0">

          {/* ── Hurry Up! + message ──────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:flex-nowrap lg:justify-start">
            <span className="st-hurry flex items-center gap-1.5">
              <span style={{ fontSize: "16px" }} aria-hidden="true">⚡</span>
              <span
                className="text-[11px] font-black tracking-[0.12em] uppercase sm:text-[12px] sm:tracking-[0.14em]"
                style={{ color: GOLD }}
              >
                Hurry Up!
              </span>
            </span>
            <span className="text-[12px] font-bold text-white sm:text-[13px]">
              Hurry — price resets at zero!
            </span>
          </div>

          {/* ── Timer + CTA ──────────────────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Timer */}
            <div
              className="flex shrink-0 items-center gap-1"
              aria-live="polite"
              aria-label={`${days} days ${hours} hours ${mins} minutes ${sec} seconds remaining`}
            >
              {/* HOURS — always visible */}
              <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
                <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(hours)}</span>
                <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Hrs</span>
              </div>
              <span className="st-sep" aria-hidden="true">:</span>

              {/* MINS */}
              <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
                <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(mins)}</span>
                <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Mins</span>
              </div>
              <span className="st-sep" aria-hidden="true">:</span>
              {/* SECS */}
              <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
                <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(sec)}</span>
                <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Secs</span>
              </div>
            </div>

            {/* CTA — short on mobile, full text from sm up */}
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="st-cta"
            >
              <span className="sm:hidden">Get it $9.99</span>
              <span className="hidden sm:inline">Get the Book — $9.99&nbsp;→</span>
            </a>
          </div>

        </div>
      </div>

      {/* Spacer — tracks the bar's real (responsive) height */}
      <div style={{ height: barHeight }} aria-hidden="true" />
    </>
  );
}

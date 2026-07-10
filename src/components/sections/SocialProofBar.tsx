"use client";

import { useInView } from "react-intersection-observer";

const GOLD = "#C9A84C";
const NAVY = "#000025";

const ITEMS = [
  { value: "500+",   label: "Agency Owners" },
  { value: "4.9★",   label: "Average Rating" },
  { value: "12+",    label: "Countries" },
  { value: "A to Z", label: "Complete System" },
];

export function SocialProofBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <>
      <style>{`
        @keyframes sp-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sp-bar {
          opacity: 0;
        }
        .sp-bar.sp-in {
          animation: sp-fade-in 0.5s ease-out both;
        }
        .sp-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .sp-val {
          font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
          font-weight: 900;
          color: ${GOLD};
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .sp-lbl {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.42);
          white-space: nowrap;
        }
        .sp-sep {
          width: 1px;
          height: 36px;
          background: rgba(201,168,76,0.2);
          flex-shrink: 0;
        }
        /* Scrolling ticker on very small screens */
        @media (max-width: 400px) {
          .sp-inner {
            justify-content: flex-start !important;
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .sp-inner::-webkit-scrollbar { display: none; }
        }
      `}</style>

      <div
        ref={ref}
        className={`sp-bar ${inView ? "sp-in" : ""}`}
        style={{
          backgroundColor: "#00001E",
          borderTop:    "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
        aria-label="Social proof statistics"
      >
        <div
          className="sp-inner mx-auto flex max-w-4xl items-center justify-center gap-6 px-6 py-4 sm:gap-10"
        >
          {ITEMS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-6 sm:gap-10">
              <div className="sp-item">
                <span className="sp-val">{value}</span>
                <span className="sp-lbl">{label}</span>
              </div>
              {i < ITEMS.length - 1 && <div className="sp-sep" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

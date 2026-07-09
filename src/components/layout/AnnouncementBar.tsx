"use client";

import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small delay so the browser paints first, then slides in
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const scrollToFinalCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── custom styles ────────────────────────────────────────────── */}
      <style>{`
        @keyframes bar-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }
        .ann-cta {
          position: relative;
          display: inline-block;
          animation: bar-pulse 2.4s ease-in-out infinite;
        }
        .ann-cta::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #000025;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s ease-out;
        }
        .ann-cta:hover::after {
          transform: scaleX(1);
        }
        .ann-cta:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── bar ──────────────────────────────────────────────────────── */}
      <div
        role="banner"
        aria-label="Book announcement"
        style={{
          backgroundColor: "#C9A84C",
          color: "#000025",
          transform: mounted ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
        className="fixed inset-x-0 top-0 z-[200] w-full"
      >
        <div
          className="mx-auto flex h-[52px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[44px] sm:px-6 lg:px-8"
        >
          {/* Left — hidden on mobile to save space */}
          <span
            className="hidden shrink-0 text-[10px] font-black tracking-[0.18em] uppercase sm:block"
            style={{ color: "#000025" }}
          >
            Now Available on Amazon
          </span>

          {/* Centre */}
          <p
            className="flex-1 text-center text-[13px] font-bold leading-tight sm:text-sm"
            style={{ color: "#000025" }}
          >
            <span className="sm:hidden">7-Figure Agency Mindset A-Z </span>
            <span className="hidden sm:inline">7-Figure Agency Mindset A-Z — </span>
            Get Your Copy for&nbsp;$19
          </p>

          {/* Right — CTA link */}
          <a
            href="#final-cta"
            onClick={scrollToFinalCta}
            className="ann-cta shrink-0 text-[13px] font-black sm:text-sm"
            style={{ color: "#000025" }}
          >
            Claim Your Copy&nbsp;→
          </a>
        </div>
      </div>

      {/* Spacer so page content isn't hidden under the bar */}
      <div className="h-[52px] sm:h-[44px]" aria-hidden="true" />
    </>
  );
}

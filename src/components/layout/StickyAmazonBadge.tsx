"use client";

import { useEffect, useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#000025";

const AMAZON_URL = "https://www.amazon.com/dp/B0G6TKKRHP";

export function StickyAmazonBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .sab-wrap {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 250;
          opacity: 0;
          transform: translateY(24px) scale(0.92);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .sab-wrap.sab-on {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @keyframes sab-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .sab-book {
          animation: sab-float 3.6s ease-in-out infinite;
          margin-bottom: -14px;
          position: relative;
          z-index: 2;
        }

        .sab-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${GOLD};
          color: ${NAVY};
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          text-align: center;
          white-space: nowrap;
          border-radius: 999px;
          padding: 11px 18px;
          box-shadow: 0 10px 28px rgba(201,168,76,0.45), 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .sab-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(201,168,76,0.55), 0 4px 10px rgba(0,0,0,0.35);
        }

        @media (max-width: 480px) {
          .sab-wrap { right: 12px; bottom: 12px; }
          .sab-pill { font-size: 10.5px; padding: 9px 14px; }
        }
      `}</style>

      <div className={`sab-wrap ${visible ? "sab-on" : ""}`}>
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy 7-Figure Agency Mindset A-Z on Amazon"
          className="flex flex-col items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/book.png"
            alt=""
            width={160}
            height={210}
            className="sab-book w-[64px] drop-shadow-xl sm:w-[72px]"
            aria-hidden="true"
          />
          <span className="sab-pill">Now Available on Amazon!</span>
        </a>
      </div>
    </>
  );
}

"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  { value: 12000, suffix: "+", label: "Active businesses",    description: "Across 50+ countries" },
  { value: 4.8,   decimals: 1, label: "Average ROAS",         description: "Return on ad spend"   },
  { value: 127,   suffix: "%", label: "Average revenue lift", description: "In the first 90 days" },
  { value: 99.9,  suffix: "%", decimals: 1, label: "Platform uptime", description: "SLA guaranteed"   },
];

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="border-y border-slate-100 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map(({ value, suffix, decimals, label, description }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-extrabold tabular-nums text-slate-900 sm:text-5xl">
                {inView ? (
                  <CountUp
                    end={value}
                    decimals={decimals}
                    duration={2}
                    separator=","
                    suffix={suffix ?? ""}
                  />
                ) : (
                  "0"
                )}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-800">{label}</p>
              <p className="mt-0.5 text-sm text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

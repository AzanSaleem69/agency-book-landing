import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "accent" | "success" | "warning" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "brand", className }: BadgeProps) {
  const variants = {
    brand:   "bg-brand-50 text-brand-700 ring-brand-200",
    accent:  "bg-accent-50 text-accent-600 ring-accent-100",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    neutral: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

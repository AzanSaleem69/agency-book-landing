import Link from "next/link";
import { Zap, X, Rss, Code2, PlayCircle } from "lucide-react";

const footerLinks = {
  Product:  ["Features", "Pricing", "Changelog", "Roadmap", "Beta"],
  Company:  ["About", "Blog", "Careers", "Press", "Contact"],
  Resources:["Documentation", "API Reference", "Community", "Status", "Support"],
  Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  { icon: X,          href: "#", label: "X (Twitter)" },
  { icon: Rss,        href: "#", label: "Blog"        },
  { icon: Code2,      href: "#", label: "GitHub"      },
  { icon: PlayCircle, href: "#", label: "YouTube"     },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">AdBoost</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              The all-in-one marketing platform that helps businesses grow faster with smarter ads.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} AdBoost Inc. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Made with ♥ for marketers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

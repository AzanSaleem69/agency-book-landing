import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AdBoost — AI-Powered Marketing Platform",
  description:
    "Supercharge your marketing with AI-powered targeting, real-time analytics, and automated optimisation. Start your 14-day free trial today.",
  keywords: ["marketing", "ads", "advertising", "AI", "analytics", "ROAS", "PPC"],
  openGraph: {
    title: "AdBoost — AI-Powered Marketing Platform",
    description: "Spend less. Earn more. Grow faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}

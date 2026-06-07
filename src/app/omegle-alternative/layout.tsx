import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Omegle Alternative 2026 — AI-Powered, Free & Safe | Chatjeen",
  description:
    "Omegle is gone. Chatjeen is the best Omegle alternative in 2026 — AI-matched conversations, zero signup, 100% free, and built-in AI safety. Better than Omegle ever was.",
  alternates: { canonical: "https://chatjeen.online/omegle-alternative" },
  openGraph: {
    title: "Best Omegle Alternative 2026 — AI-Powered & Free | Chatjeen",
    description: "Omegle is dead. Chatjeen is the modern alternative — AI matching, no signup, 100% free.",
    url: "https://chatjeen.online/omegle-alternative",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Best Omegle Alternative | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Omegle Alternative 2026 | Chatjeen",
    description: "Omegle is dead. Chatjeen is the modern alternative — AI matching, no signup, 100% free.",
    images: ["/icons/og-image.png"],
  },
};

export default function OmegleAlternativeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

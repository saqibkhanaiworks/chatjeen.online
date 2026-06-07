import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety & Community Guidelines — Your Safety Is the Product | Chatjeen",
  description:
    "Learn how Chatjeen uses real-time AI moderation, instant skip/report, and anonymous-by-design principles to ensure a safe chat experience for everyone.",
  alternates: { canonical: "https://chatjeen.online/safety" },
  openGraph: {
    title: "Safety & Community Guidelines | Chatjeen",
    description: "How Chatjeen keeps anonymous chat safe with AI moderation, skip/report, and privacy-first design.",
    url: "https://chatjeen.online/safety",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Chatjeen Safety Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safety Guide | Chatjeen",
    description: "How Chatjeen keeps anonymous chat safe with AI moderation, skip/report, and privacy-first design.",
    images: ["/icons/og-image.png"],
  },
};

export default function SafetyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Chatjeen Usage Rules & Guidelines",
  description:
    "Read Chatjeen's Terms of Service. By using Chatjeen you agree to our community rules, acceptable use policy, and content guidelines.",
  alternates: { canonical: "https://chatjeen.online/terms" },
  openGraph: {
    title: "Terms of Service | Chatjeen",
    description: "Read Chatjeen's Terms of Service, acceptable use policy, and community guidelines.",
    url: "https://chatjeen.online/terms",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Chatjeen Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Chatjeen",
    description: "Read Chatjeen's Terms of Service, acceptable use policy, and community guidelines.",
    images: ["/icons/og-image.png"],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

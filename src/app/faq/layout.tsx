import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Chatjeen",
  description:
    "Got questions about Chatjeen? Find answers about anonymity, safety, AI matching, account requirements, voice chat, and more. Everything you need to know.",
  alternates: {
    canonical: "https://chatjeen.online/faq",
  },
  openGraph: {
    title: "FAQ — Frequently Asked Questions | Chatjeen",
    description:
      "Answers to the most common questions about Chatjeen — anonymous chat, safety, AI matching, and more.",
    url: "https://chatjeen.online/faq",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Chatjeen FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Chatjeen",
    description: "Everything you need to know about Chatjeen — anonymous chat, safety, AI matching, and more.",
    images: ["/icons/og-image.png"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

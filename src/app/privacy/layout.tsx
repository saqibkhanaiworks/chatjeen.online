import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — How Chatjeen Protects Your Data",
  description:
    "Chatjeen is built on anonymity. Read our Privacy Policy to learn exactly what data we collect (very little), what we don't store (your chats), and your rights.",
  alternates: { canonical: "https://chatjeen.online/privacy" },
  openGraph: {
    title: "Privacy Policy | Chatjeen",
    description: "Chatjeen is built on anonymity. Learn what we collect, what we don't, and your rights.",
    url: "https://chatjeen.online/privacy",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Chatjeen Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Chatjeen",
    description: "Chatjeen is built on anonymity. Learn what we collect, what we don't, and your rights.",
    images: ["/icons/og-image.png"],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

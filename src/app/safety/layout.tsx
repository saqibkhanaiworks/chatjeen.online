import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety & Community Guidelines — Your safety is the product",
  description: "Learn how Chatjeen uses real-time AI moderation, filters, and skip/report features to ensure a safe, anonymous text chat experience for everyone.",
  alternates: {
    canonical: "https://chatjeen.online/safety",
  }
};

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

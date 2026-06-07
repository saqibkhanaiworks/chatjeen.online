import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — We built the chat app we always wanted",
  description: "Chatjeen is built with AI from day one. Anonymous by design. 100% free. Learn about the Google Antigravity stack powering our platform.",
  alternates: {
    canonical: "https://chatjeen.online/about",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

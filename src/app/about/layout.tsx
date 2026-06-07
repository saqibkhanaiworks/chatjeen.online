import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chatjeen — The AI-Powered Anonymous Chat Platform",
  description:
    "Learn how Chatjeen was built — an AI-native anonymous chat for Gen-Z. No signup, no tracking, just real conversations with real people from around the world.",
  alternates: { canonical: "https://chatjeen.online/about" },
  openGraph: {
    title: "About Chatjeen — AI-Powered Anonymous Chat",
    description: "Learn how Chatjeen was built — AI-native, anonymous, free, and built for Gen-Z conversations.",
    url: "https://chatjeen.online/about",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "About Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Chatjeen",
    description: "Learn how Chatjeen was built — AI-native, anonymous, free, and built for Gen-Z conversations.",
    images: ["/icons/og-image.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

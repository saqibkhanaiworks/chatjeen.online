import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Chat Online Free — Meet Strangers Instantly | Chatjeen",
  description:
    "Free random chat with strangers worldwide. AI-matched for better conversations — not just pure random. No signup, no email. Start chatting in one click.",
  alternates: { canonical: "https://chatjeen.online/random-chat" },
  openGraph: {
    title: "Random Chat Online Free — Meet Strangers Instantly | Chatjeen",
    description: "AI-matched random chat. Better than pure random. No signup. 100% free.",
    url: "https://chatjeen.online/random-chat",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Random Chat | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Chat | Chatjeen",
    description: "AI-matched random chat. Better than pure random. No signup. 100% free.",
    images: ["/icons/og-image.png"],
  },
};

export default function RandomChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

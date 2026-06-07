import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk to Strangers Online Free — No Signup | Chatjeen",
  description:
    "Talk to strangers online for free with Chatjeen. AI matches you by interests for better conversations. No account, no email, no tracking. Start in seconds.",
  alternates: { canonical: "https://chatjeen.online/talk-to-strangers" },
  openGraph: {
    title: "Talk to Strangers Online Free — No Signup | Chatjeen",
    description: "AI-matched anonymous chats with strangers worldwide. No signup. 100% free.",
    url: "https://chatjeen.online/talk-to-strangers",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Talk to Strangers Online | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk to Strangers Online | Chatjeen",
    description: "AI-matched anonymous chats. No signup. 100% free. Better than Omegle.",
    images: ["/icons/og-image.png"],
  },
};

export default function TalkToStrangersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

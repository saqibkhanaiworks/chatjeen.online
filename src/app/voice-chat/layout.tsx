import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice Chat With Strangers Online — Free & Anonymous | Chatjeen",
  description:
    "Looking for voice chat with strangers? Chatjeen offers AI-matched anonymous chat. Voice chat coming soon — for now, enjoy the best text chat experience with strangers worldwide.",
  alternates: { canonical: "https://chatjeen.online/voice-chat" },
  openGraph: {
    title: "Voice Chat With Strangers — Free & Anonymous | Chatjeen",
    description:
      "AI-matched anonymous chat with strangers. Voice chat coming soon. No signup, no email. 100% free.",
    url: "https://chatjeen.online/voice-chat",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Voice Chat With Strangers | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice Chat With Strangers | Chatjeen",
    description: "AI-matched anonymous chat with strangers. Voice chat coming soon. No signup, 100% free.",
    images: ["/icons/og-image.png"],
  },
};

export default function VoiceChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

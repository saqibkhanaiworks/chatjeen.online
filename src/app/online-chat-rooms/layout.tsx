import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Chat Rooms — Free, Anonymous & AI-Powered | Chatjeen",
  description:
    "Join free online chat rooms on Chatjeen. AI matches you with compatible strangers in interest-based chat rooms — music, gaming, travel, and more. No signup needed.",
  alternates: { canonical: "https://chatjeen.online/online-chat-rooms" },
  openGraph: {
    title: "Online Chat Rooms — Free & Anonymous | Chatjeen",
    description: "AI-powered interest-based online chat rooms. No signup. 100% free. Better than traditional chat rooms.",
    url: "https://chatjeen.online/online-chat-rooms",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Online Chat Rooms | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Chat Rooms | Chatjeen",
    description: "AI-powered online chat rooms. No signup. 100% free.",
    images: ["/icons/og-image.png"],
  },
};

export default function OnlineChatRoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

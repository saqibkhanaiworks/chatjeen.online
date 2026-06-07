import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Chat No Signup — Chat With Strangers Instantly | Chatjeen",
  description:
    "No registration. No email. No password. Just open Chatjeen and start chatting with strangers instantly. The fastest way to have a real anonymous conversation online.",
  alternates: { canonical: "https://chatjeen.online/free-chat-no-signup" },
  openGraph: {
    title: "Free Chat No Signup — Instant Anonymous Chat | Chatjeen",
    description: "No registration. No email. No password. Just open and start chatting. Instant anonymous chat.",
    url: "https://chatjeen.online/free-chat-no-signup",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Free Chat No Signup | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Chat No Signup | Chatjeen",
    description: "No registration. No email. Just open and start chatting with strangers instantly.",
    images: ["/icons/og-image.png"],
  },
};

export default function FreeChatNoSignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Anonymous Chat With Strangers — No Signup | Chatjeen",
  description:
    "Chat anonymously with strangers worldwide on Chatjeen. No email, no account, no tracking. AI matches you by interests in seconds. 100% private and free.",
  alternates: { canonical: "https://chatjeen.online/anonymous-chat" },
  openGraph: {
    title: "Free Anonymous Chat With Strangers — No Signup | Chatjeen",
    description: "100% anonymous chat. No account. No email. AI-matched by interests. Start in one click.",
    url: "https://chatjeen.online/anonymous-chat",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Anonymous Chat | Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Anonymous Chat | Chatjeen",
    description: "100% anonymous chat. No account. No email. AI-matched by interests.",
    images: ["/icons/og-image.png"],
  },
};

export default function AnonymousChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

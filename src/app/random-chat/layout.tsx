import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Chat Online Free — Meet Strangers Instantly | Chatjeen",
  description: "Random chat with strangers worldwide. AI-matched for better conversations. Free, instant, no signup required.",
  alternates: {
    canonical: "https://chatjeen.online/random-chat",
  }
};

export default function RandomChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

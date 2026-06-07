import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Anonymous Chat With Strangers — No Signup | Chatjeen",
  description: "Chat anonymously with strangers worldwide. No email, no account, no tracking. 100% private. Start in one click.",
  alternates: {
    canonical: "https://chatjeen.online/anonymous-chat",
  }
};

export default function AnonymousChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

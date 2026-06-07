import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Chat No Signup — Talk to Strangers Instantly | Chatjeen",
  description: "No email. No account. No password. Just click and chat with strangers worldwide for free. Truly frictionless.",
  alternates: {
    canonical: "https://chatjeen.online/free-chat-no-signup",
  }
};

export default function FreeChatNoSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

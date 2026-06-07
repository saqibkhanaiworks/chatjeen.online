import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Bot, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Philosophy Chat With Strangers — Deep Talk, No Signup | Chatjeen",
  description:
    "Have deep philosophy conversations with strangers worldwide. No account, no email. Chatjeen matches you with someone curious about life's big questions — free, anonymous, instant.",
  alternates: { canonical: "https://chatjeen.online/chat/philosophy" },
  openGraph: {
    title: "Philosophy Chat With Strangers — Deep Talk | Chatjeen",
    description:
      "Anonymous deep-talk chat. Get matched with someone who wants to talk philosophy, life, and the big questions. No signup required.",
    url: "https://chatjeen.online/chat/philosophy",
    siteName: "Chatjeen",
    type: "website",
  },
};

export default function PhilosophyChatPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://chatjeen.online" },
              { "@type": "ListItem", position: 2, name: "Philosophy Chat", item: "https://chatjeen.online/chat/philosophy" },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            🤔 Deep Talk · Philosophy Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Philosophy Chat With Strangers.
            <span className="text-pop-gradient block">The Big Questions.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Some questions are easier to explore with someone you&apos;ll never meet. Find a stranger who wants to dig into consciousness, free will, ethics, and everything in between — no signup, completely anonymous.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat?mood=philosophy"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Deep Talk <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chat"
              className="bg-surface border border-border text-textPrimary font-semibold px-8 py-4 rounded-full hover:border-primary transition-all text-center"
            >
              Browse All Moods
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">What to expect in a Deep Talk chat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🧠", title: "Real conversations", desc: "AI matches you with someone who picked the same Deep Talk mood — so both of you came here to think, not just chat." },
              { icon: "🌍", title: "Global perspectives", desc: "Your match could be from anywhere. Philosophy lands differently depending on where someone grew up." },
              { icon: "🔒", title: "Completely anonymous", desc: "No account, no identity. Say things you'd only say to a stranger. When you leave, it's gone." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-surface border border-border rounded-[16px] p-6 space-y-3">
                <div className="text-2xl">{icon}</div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-textMuted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-bold text-white">Conversation starters for philosophy chat</h2>
          <ul className="space-y-3 text-textMuted text-sm">
            {[
              "Do you think free will actually exists?",
              "If you could know the meaning of life, would you want to?",
              "What's one belief you hold that you can't fully justify?",
              "Is it possible to truly understand another person's experience?",
              "Would you rather be happy or know the truth?",
            ].map((q) => (
              <li key={q} className="flex gap-3 items-start bg-surface border border-border rounded-[12px] px-4 py-3">
                <span className="text-primary font-bold shrink-0">Q:</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-surface border border-border rounded-[20px] p-8 space-y-5">
          <h2 className="text-xl font-bold text-white">Explore more chat moods</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              { href: "/chat/gaming", label: "🎮 Gamer Talk", desc: "Games & tech culture" },
              { href: "/chat/music", label: "🎵 Music Match", desc: "Discover music globally" },
              { href: "/chat/travel", label: "🌍 Culture Swap", desc: "Where are you from?" },
              { href: "/chat/memes", label: "😂 Just Vibes", desc: "Memes & randomness" },
              { href: "/chat/2am", label: "🌙 2AM Mode", desc: "Late night honesty" },
              { href: "/anonymous-chat", label: "🔒 Anonymous Chat", desc: "Zero identity match" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-surface2 border border-border rounded-[12px] p-4 hover:border-primary transition-all space-y-1">
                <div className="font-semibold text-white text-xs">{link.label}</div>
                <div className="text-textMuted text-xs">{link.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

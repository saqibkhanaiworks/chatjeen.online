import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gaming Chat With Strangers — Gamer Talk No Signup | Chatjeen",
  description:
    "Talk games, tech, and internet culture with strangers worldwide. No account needed. Chatjeen matches you with a fellow gamer in seconds — free, anonymous, instant.",
  alternates: { canonical: "https://chatjeen.online/chat/gaming" },
  openGraph: {
    title: "Gaming Chat With Strangers — Gamer Talk | Chatjeen",
    description:
      "Anonymous gamer chat. Get matched with someone who loves games, tech, and internet culture. No signup required.",
    url: "https://chatjeen.online/chat/gaming",
    siteName: "Chatjeen",
    type: "website",
  },
};

export default function GamingChatPage() {
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
              { "@type": "ListItem", position: 2, name: "Gaming Chat", item: "https://chatjeen.online/chat/gaming" },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            🎮 Gamer Talk · Gaming Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Gaming Chat With Strangers.
            <span className="text-pop-gradient block">Find Your Lobby.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Match with someone who actually gets gaming culture — no signup, no small talk. Talk about what you&apos;re playing, debate meta, or just vibe about internet culture with a stranger across the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat?mood=gaming"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Gamer Talk <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white text-center">What Gamer Talk looks like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🎯", title: "Matched by interest", desc: "You both picked gaming. Skip the intro — just get straight to talking about what you're playing right now." },
              { icon: "🌐", title: "Global gaming culture", desc: "What's big in South Korea, Japan, or Brazil? Different gaming scenes have wildly different cultures." },
              { icon: "🔒", title: "Zero signup", desc: "No Steam link, no Discord handle, no identity. Just anonymous gamer chat that disappears when you leave." },
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
          <h2 className="text-xl font-bold text-white">Gaming chat openers that actually work</h2>
          <ul className="space-y-3 text-textMuted text-sm">
            {[
              "What's one game you'd recommend to anyone right now?",
              "Controller or keyboard — and why are you wrong?",
              "What's a game that changed how you think about something?",
              "Most overhyped game you played this year?",
              "If you could only play one game for a year, what is it?",
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
              { href: "/chat/philosophy", label: "🤔 Deep Talk", desc: "Philosophy & big questions" },
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

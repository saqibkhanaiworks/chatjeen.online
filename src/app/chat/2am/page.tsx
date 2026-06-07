import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Late Night Chat — 2AM Chat With Strangers | Chatjeen",
  description:
    "Can't sleep? Chat with a stranger at 2AM. No signup. Chatjeen matches you with someone else who's awake and wants to talk — honest, anonymous, free.",
  alternates: { canonical: "https://chatjeen.online/chat/2am" },
  openGraph: {
    title: "2AM Chat With Strangers — Late Night Mode | Chatjeen",
    description:
      "Can't sleep? Neither can a stranger somewhere in the world. Anonymous late night chat — no signup required.",
    url: "https://chatjeen.online/chat/2am",
    siteName: "Chatjeen",
    type: "website",
  },
};

export default function TwoAMChatPage() {
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
              { "@type": "ListItem", position: 2, name: "2AM Mode Chat", item: "https://chatjeen.online/chat/2am" },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            🌙 2AM Mode · Late Night Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Can&apos;t Sleep? Chat With a Stranger.
            <span className="text-pop-gradient block">2AM Mode.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            It&apos;s late, you can&apos;t sleep, and you have thoughts. Somewhere else in the world, there&apos;s a stranger in the exact same situation. Talk to them. No signup, no judgment, no morning-after awkwardness.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat?mood=2am"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Enter 2AM Mode <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white text-center">Why late night conversations hit different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🌙", title: "Lower guards", desc: "There's something about 2AM that makes people more honest. Less performance, more real talk." },
              { icon: "🌍", title: "Always someone awake", desc: "When it's 2AM for you, it's afternoon somewhere else. The world never really sleeps." },
              { icon: "🔒", title: "Gone by morning", desc: "The conversation disappears when you disconnect. Nothing is saved. Nothing is permanent." },
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
          <h2 className="text-xl font-bold text-white">Late night conversation starters</h2>
          <ul className="space-y-3 text-textMuted text-sm">
            {[
              "What's keeping you awake right now?",
              "What do you think about when you can't sleep?",
              "What's a thought you have at 2AM that you'd never say at noon?",
              "If you could fix one thing about your life starting tomorrow, what would it be?",
              "What's something you've been avoiding thinking about?",
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
              { href: "/chat/gaming", label: "🎮 Gamer Talk", desc: "Games & tech culture" },
              { href: "/chat/music", label: "🎵 Music Match", desc: "Discover music globally" },
              { href: "/chat/travel", label: "🌍 Culture Swap", desc: "Where are you from?" },
              { href: "/chat/memes", label: "😂 Just Vibes", desc: "Memes & randomness" },
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

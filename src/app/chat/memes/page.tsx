import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Meme Chat & Random Chat With Strangers — Just Vibes | Chatjeen",
  description:
    "Random fun chat with strangers — memes, weird topics, no pressure. No signup. Chatjeen matches you with someone who just wants to vibe — free, anonymous, instant.",
  alternates: { canonical: "https://chatjeen.online/chat/memes" },
  openGraph: {
    title: "Meme Chat With Strangers — Just Vibes | Chatjeen",
    description:
      "Chill anonymous chat. Memes, random stuff, no pressure. No signup required.",
    url: "https://chatjeen.online/chat/memes",
    siteName: "Chatjeen",
    type: "website",
  },
};

export default function MemesChatPage() {
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
              { "@type": "ListItem", position: 2, name: "Just Vibes Chat", item: "https://chatjeen.online/chat/memes" },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            😂 Just Vibes · Meme Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Random Chat With Strangers.
            <span className="text-pop-gradient block">No Pressure. Just Vibes.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Not everything needs to be deep. Sometimes you just want to talk about the dumbest meme you saw today with someone who gets it. No signup, no agenda, just two strangers having a genuinely weird conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat?mood=memes"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Just Vibes <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white text-center">What Just Vibes actually means</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "😂", title: "No topic agenda", desc: "Literally anything goes — memes, random questions, hypotheticals, conspiracy theories, your current hyperfixation." },
              { icon: "⚡", title: "Instant match", desc: "No setup. No interests required. Just click and talk. You both picked vibes, so both of you are ready to go." },
              { icon: "🌙", title: "Zero pressure", desc: "If it's not clicking, skip. No awkward goodbyes. No obligation to be interesting. Just mess around." },
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
          <h2 className="text-xl font-bold text-white">Random conversation starters (the good kind)</h2>
          <ul className="space-y-3 text-textMuted text-sm">
            {[
              "What's the most useless talent you have?",
              "What's a hill you'll die on that no one else cares about?",
              "Describe your personality using only food.",
              "What's the weirdest Wikipedia rabbit hole you've gone down?",
              "What's something you're irrationally good at?",
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
              { href: "/chat/2am", label: "🌙 2AM Mode", desc: "Late night honesty" },
              { href: "/random-chat", label: "🎲 Random Chat", desc: "Fully random match" },
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

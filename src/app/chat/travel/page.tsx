import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Culture Swap Chat — Talk to Strangers From Around the World | Chatjeen",
  description:
    "Chat with strangers about culture, travel, and where they're from. No signup. Chatjeen matches you with someone from a different country instantly — free, anonymous.",
  alternates: { canonical: "https://chatjeen.online/chat/travel" },
  openGraph: {
    title: "Culture Swap — Chat With Strangers From Any Country | Chatjeen",
    description:
      "Anonymous cultural exchange chat. Learn about a stranger's country, food, and life — no signup required.",
    url: "https://chatjeen.online/chat/travel",
    siteName: "Chatjeen",
    type: "website",
  },
};

export default function TravelChatPage() {
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
              { "@type": "ListItem", position: 2, name: "Culture Swap Chat", item: "https://chatjeen.online/chat/travel" },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            🌍 Culture Swap · Global Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Talk to Strangers From Any Country.
            <span className="text-pop-gradient block">Culture Swap.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Ask a stranger about their country, their food, their life. Tell them about yours. The world is bigger and more interesting than any travel guide — and this is how you actually see it. No signup, completely anonymous.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat?mood=travel"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Culture Swap <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white text-center">Why Culture Swap works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🌐", title: "Real perspectives", desc: "No curated travel content. Just a real person from somewhere else, talking about what life is actually like there." },
              { icon: "🍜", title: "From food to politics", desc: "Cultural exchange goes wherever the conversation goes. Food, language, daily life, current events — nothing is off limits." },
              { icon: "🔒", title: "Safe and anonymous", desc: "No location sharing, no identity. You're just two strangers from different places, talking." },
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
          <h2 className="text-xl font-bold text-white">Culture swap conversation starters</h2>
          <ul className="space-y-3 text-textMuted text-sm">
            {[
              "What's something about your country that outsiders always get wrong?",
              "What's the best local food where you're from that no one outside knows about?",
              "What does a typical weekend look like for people your age there?",
              "What do you wish visitors understood before they came?",
              "What's something you envy about other countries' cultures?",
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
              { href: "/chat/memes", label: "😂 Just Vibes", desc: "Memes & randomness" },
              { href: "/chat/2am", label: "🌙 2AM Mode", desc: "Late night honesty" },
              { href: "/talk-to-strangers", label: "💬 Talk to Strangers", desc: "Random global match" },
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

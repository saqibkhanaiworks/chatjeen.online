import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Music Chat With Strangers — Share What You're Listening To | Chatjeen",
  description:
    "Discover music from strangers worldwide. No signup needed. Chatjeen matches you with someone who wants to talk artists, albums, and playlists — free, anonymous, instant.",
  alternates: { canonical: "https://chatjeen.online/chat/music" },
  openGraph: {
    title: "Music Chat With Strangers — Music Match | Chatjeen",
    description:
      "Anonymous music chat. Share what you're listening to with a stranger across the world. No signup required.",
    url: "https://chatjeen.online/chat/music",
    siteName: "Chatjeen",
    type: "website",
  },
};

export default function MusicChatPage() {
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
              { "@type": "ListItem", position: 2, name: "Music Chat", item: "https://chatjeen.online/chat/music" },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            🎵 Music Match · Music Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Music Chat With Strangers.
            <span className="text-pop-gradient block">Global Playlists.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Somewhere out there is a stranger with a nearly identical playlist. Find them. Talk albums, recommend artists, debate genres — completely anonymous, zero signup, instant match.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat?mood=music"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Music Match <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white text-center">Why music hits different with a stranger</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🎧", title: "No algorithm involved", desc: "Your match isn't a recommendation engine. They're a real person with real taste who might play you something you'd never discover otherwise." },
              { icon: "🌍", title: "Global music discovery", desc: "UK grime, Nigerian Afrobeats, Japanese city pop — music is local until someone shares it with you." },
              { icon: "🔒", title: "Anonymous, no sharing", desc: "No Spotify link required. No social handle. Just talk music with zero identity attached." },
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
          <h2 className="text-xl font-bold text-white">Music conversation starters</h2>
          <ul className="space-y-3 text-textMuted text-sm">
            {[
              "What album do you wish you could hear for the first time again?",
              "What's the most obscure artist you love?",
              "What song do you always skip but keep in your playlist?",
              "If you could only listen to music from one decade forever, which one?",
              "What's a track that just hits different at 2AM?",
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

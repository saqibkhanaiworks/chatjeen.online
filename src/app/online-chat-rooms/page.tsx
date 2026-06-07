import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rooms = [
  { emoji: "🤔", label: "Deep Talk", tag: "philosophy", desc: "Philosophy, existential questions, life." },
  { emoji: "😂", label: "Just Vibes", tag: "memes", desc: "Memes, random banter, no pressure." },
  { emoji: "🌍", label: "Culture Swap", tag: "travel", desc: "Share where you're from and explore." },
  { emoji: "🎮", label: "Gamer Talk", tag: "gaming", desc: "Games, tech, internet culture." },
  { emoji: "🎵", label: "Music Match", tag: "music", desc: "Share what you're listening to." },
  { emoji: "🌙", label: "2AM Mode", tag: "2am", desc: "Night owls who can't sleep." },
];

export default function OnlineChatRoomsPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chatjeen.online" },
              { "@type": "ListItem", "position": 2, "name": "Online Chat Rooms", "item": "https://chatjeen.online/online-chat-rooms" },
            ],
          }),
        }}
      />
      <Header />

      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto w-full flex-1 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            <Bot className="w-3.5 h-3.5 mr-1.5" /> AI-Powered Online Chat Rooms
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Online Chat Rooms.
            <span className="text-pop-gradient block">Reimagined With AI.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Traditional online chat rooms are dead — full of bots, spam, and randos. Chatjeen reinvents them with
            AI-powered mood-based matching. Pick a room, get matched with someone compatible, and have a real conversation.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
          >
            Enter a Chat Room <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Room Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Choose your chat room</h2>
            <p className="text-textMuted text-sm">
              Unlike old-school chat rooms, our AI finds you a real match within each category.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Link
                key={room.tag}
                href={`/chat?mood=${room.tag}`}
                className="bg-surface border border-border rounded-[16px] p-6 text-left flex flex-col justify-between hover:border-primary hover:bg-[#1C1830] hover:translate-y-[-2px] transition-all duration-200 min-h-[150px] group"
              >
                <div className="text-3xl filter group-hover:scale-110 transition-transform duration-200">
                  {room.emoji}
                </div>
                <div className="space-y-1 mt-4">
                  <div className="text-white font-semibold text-[15px]">{room.label}</div>
                  <div className="text-textMuted text-[13px] leading-tight">{room.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Chatjeen section */}
        <section className="bg-surface border border-border rounded-[20px] p-8 space-y-5">
          <h2 className="text-xl font-bold text-white">Why Chatjeen beats traditional chat rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-textMuted">
            <div className="space-y-2">
              <div className="text-white font-semibold">No bots. No spam.</div>
              <p>AI moderation filters out bad actors in real time. Every match is a real human.</p>
            </div>
            <div className="space-y-2">
              <div className="text-white font-semibold">Matched by interest.</div>
              <p>You choose a mood or topic. We find someone actually compatible — not just whoever is online.</p>
            </div>
            <div className="space-y-2">
              <div className="text-white font-semibold">Zero signup.</div>
              <p>No registration, no profile, no email. Open the app and start talking in under 10 seconds.</p>
            </div>
          </div>
          <Link
            href="/anonymous-chat"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:opacity-80 transition-all"
          >
            Learn about Anonymous Chat <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Internal links */}
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
          {[
            { href: "/anonymous-chat", label: "Anonymous Chat" },
            { href: "/random-chat", label: "Random Chat" },
            { href: "/omegle-alternative", label: "Omegle Alternative" },
            { href: "/talk-to-strangers", label: "Talk to Strangers" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-surface2 border border-border rounded-[12px] p-4 text-center text-white font-medium hover:border-primary transition-all"
            >
              {link.label}
            </Link>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import { Mic, Lock, Zap, Bot, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VoiceChatPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Voice Chat", "item": "https://chatjeen.online/voice-chat" },
            ],
          }),
        }}
      />
      <Header />

      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto w-full flex-1 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            <Mic className="w-3.5 h-3.5 mr-1.5" /> Voice Chat With Strangers
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Voice Chat With Strangers.
            <span className="text-pop-gradient block">The Smart Way.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Want to have a voice conversation with strangers from around the world? Chatjeen is the AI-powered anonymous chat platform
            built for real, meaningful connections. Our text chat already delivers better conversations than any voice chat app —
            and voice is coming soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Chatting Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/anonymous-chat"
              className="bg-surface border border-border text-textPrimary font-semibold px-8 py-4 rounded-full hover:border-primary transition-all text-center"
            >
              Anonymous Chat →
            </Link>
          </div>
        </section>

        {/* Why Chatjeen */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Why Chatjeen is better than voice chat apps</h2>
            <p className="text-textMuted text-sm">Voice is noisy. Text is intentional. Here&apos;s what we do differently.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Bot, title: "AI Matching", desc: "Get matched by interests, not just randomly thrown at a stranger." },
              { icon: Lock, title: "Zero Identity", desc: "No account, no email, no phone. Completely anonymous." },
              { icon: Zap, title: "Instant Connection", desc: "Matched in under 3 seconds. No queue, no waiting room." },
              { icon: Mic, title: "Voice Coming Soon", desc: "We're building voice chat that's safe, anonymous, and AI-matched." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface border border-border rounded-[16px] p-6 space-y-3">
                <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-[10px] w-fit">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-textMuted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-surface border border-border rounded-[20px] p-8 space-y-5">
          <h2 className="text-xl font-bold text-white">Explore Chatjeen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { href: "/anonymous-chat", label: "Anonymous Chat", desc: "100% private, zero identity" },
              { href: "/random-chat", label: "Random Chat", desc: "Instant random matches" },
              { href: "/omegle-alternative", label: "Omegle Alternative", desc: "The modern Omegle replacement" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-surface2 border border-border rounded-[12px] p-4 hover:border-primary transition-all space-y-1"
              >
                <div className="font-semibold text-white">{link.label}</div>
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

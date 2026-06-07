import Link from "next/link";
import { Globe, ArrowRight, Shield, Zap, Bot, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TalkToStrangersPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Talk to Strangers", "item": "https://chatjeen.online/talk-to-strangers" },
            ],
          }),
        }}
      />
      <Header />

      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto w-full flex-1 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            <Globe className="w-3.5 h-3.5 mr-1.5" /> Talk to Strangers Online — Free
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Talk to Strangers.
            <span className="text-pop-gradient block">Actually Connect.</span>
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-xl mx-auto">
            Chatjeen lets you talk to strangers from anywhere in the world — instantly, anonymously, and for free.
            Our AI matches you with people who share your interests, so every conversation has a real starting point.
            No small talk. No awkward silences.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
          >
            Talk to a Stranger Now <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Features */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">The best way to talk to strangers online</h2>
            <p className="text-textMuted text-sm max-w-md mx-auto">
              We replaced random matching with AI intelligence. Here&apos;s the difference.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Bot,
                title: "AI Interest Matching",
                desc: "Select topics like music, gaming, travel, or philosophy. Our AI finds a stranger who genuinely shares your interests — not just any random person.",
              },
              {
                icon: Lock,
                title: "Full Anonymity",
                desc: "No name, no email, no account. Your identity is fully protected. Chats are ephemeral — they disappear when you disconnect.",
              },
              {
                icon: Shield,
                title: "Safe Conversations",
                desc: "Real-time AI moderation keeps bad actors out. Skip or report anyone with a single tap.",
              },
              {
                icon: Zap,
                title: "Instant Global Reach",
                desc: "Talk to strangers from 100+ countries. Matched in seconds. No waitlist, no queue.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface border border-border rounded-[16px] p-6 flex gap-4 items-start">
                <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-[10px] shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="text-textMuted text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internal linking */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white text-center">More ways to connect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/anonymous-chat", label: "Anonymous Chat", desc: "No identity. No traces." },
              { href: "/random-chat", label: "Random Chat", desc: "Let AI surprise you." },
              { href: "/free-chat-no-signup", label: "Free Chat No Signup", desc: "Start in seconds." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-surface border border-border hover:border-primary rounded-[14px] p-5 text-center transition-all space-y-1"
              >
                <div className="font-semibold text-white text-sm">{link.label}</div>
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

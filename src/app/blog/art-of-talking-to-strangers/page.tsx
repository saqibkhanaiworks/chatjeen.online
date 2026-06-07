import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Art of Talking to Strangers | Chatjeen Blog",
  description:
    "We're told not to talk to strangers. But every meaningful connection started with exactly that. Here's why stranger conversations might be the most underrated skill of our time.",
  alternates: { canonical: "https://chatjeen.online/blog/art-of-talking-to-strangers" },
  openGraph: {
    title: "The Art of Talking to Strangers | Chatjeen Blog",
    description:
      "Every meaningful connection started as a stranger conversation. Here's why we should do it more.",
    url: "https://chatjeen.online/blog/art-of-talking-to-strangers",
    siteName: "Chatjeen",
    type: "article",
  },
};

export default function ArtOfTalkingToStrangersPost() {
  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Art of Talking to Strangers",
            description: "We're told not to talk to strangers. But every meaningful connection started with exactly that.",
            author: { "@type": "Organization", name: "Chatjeen" },
            publisher: { "@type": "Organization", name: "Chatjeen", url: "https://chatjeen.online" },
            url: "https://chatjeen.online/blog/art-of-talking-to-strangers",
            datePublished: "2025-06-01",
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-2xl mx-auto w-full flex-1">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-textMuted mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-textPrimary">The Art of Talking to Strangers</span>
        </nav>

        {/* Header */}
        <article className="space-y-8">
          <header className="space-y-5">
            <span className="text-[11px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Culture
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              The Art of Talking to Strangers
            </h1>
            <p className="text-textMuted text-base leading-relaxed">
              We&apos;re told not to talk to strangers from the moment we can understand language. Yet every meaningful friendship, every great love story, every career-changing conversation — started with exactly that.
            </p>
            <div className="text-[12px] text-textMuted pt-1">June 2025 · 5 min read</div>
          </header>

          <div className="w-full h-[1px] bg-border" />

          {/* Body */}
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-textMuted text-base leading-relaxed">
            <p>
              There&apos;s a paradox at the heart of modern social life. We have more ways to communicate than ever before — text, voice, video, emoji, reaction, story, reel — and yet most people report feeling more lonely than they did a decade ago. We are constantly connected. We are rarely genuinely in contact.
            </p>

            <h2 className="text-xl font-bold text-white mt-8">Why we&apos;re bad at this now</h2>
            <p>
              Social media optimized us for performance, not conversation. Every platform trained us to craft, not speak. We write captions, not sentences. We collect reactions, not responses. The result is a generation that knows how to broadcast but has forgotten how to actually talk.
            </p>
            <p>
              The stranger conversation is the antidote. There is no audience. No one is counting your likes. The person on the other side knows nothing about your follower count, your job title, or your carefully curated aesthetic. You can just say things. Real things. Uncomfortable things. Curious things.
            </p>

            <h2 className="text-xl font-bold text-white mt-8">What strangers give you that friends can&apos;t</h2>
            <p>
              Your friends know your stories. That&apos;s a comfort, but it&apos;s also a constraint. There are versions of yourself you&apos;ve never said out loud because the people around you already have a fixed idea of who you are. A stranger has no such fixed idea. You get to be whoever you are right now, in this moment, with no backstory required.
            </p>
            <p>
              Research backs this up. Studies have found that conversations with strangers — on trains, in waiting rooms, at bus stops — are consistently rated as more enjoyable than people predicted beforehand. We consistently underestimate how interested other people are in us, and how willing they are to connect.
            </p>

            <h2 className="text-xl font-bold text-white mt-8">The mechanics of a good stranger conversation</h2>
            <p>
              Three things consistently make stranger conversations memorable:
            </p>
            <ul className="space-y-2 list-none pl-0">
              {[
                ["Genuine curiosity", "Ask something you actually want to know. Not \"what do you do?\" but \"what do you spend your time thinking about?\""],
                ["Reciprocal vulnerability", "Share something slightly more honest than feels comfortable. It gives the other person permission to do the same."],
                ["No agenda", "The best conversations have nowhere to go. No networking, no outcome, no performance review. Just two people seeing what happens."],
              ].map(([title, desc]) => (
                <li key={String(title)} className="bg-surface border border-border rounded-[12px] p-4 space-y-1">
                  <strong className="text-white block">{title}</strong>
                  <span className="text-textMuted text-sm">{desc}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-white mt-8">Why anonymous helps</h2>
            <p>
              There&apos;s a reason confession booths have walls, therapy has confidentiality, and the internet once felt liberating. When you know that nothing you say will follow you home, you talk differently. More honestly. More experimentally. More like yourself.
            </p>
            <p>
              Anonymous chat isn&apos;t a lesser form of conversation. For many things, it&apos;s a more honest one. The stranger you&apos;ll never see again gets to hear the version of you that didn&apos;t have time to edit itself.
            </p>

            <div className="bg-surface border border-primary/30 rounded-[16px] p-6 mt-8 space-y-3">
              <p className="text-white font-semibold">Ready to try it?</p>
              <p className="text-textMuted text-sm">Chatjeen matches you with a stranger in seconds. No signup, no name, no pressure. Just a conversation.</p>
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all"
              >
                Start Chatting Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </article>

        {/* More Posts */}
        <div className="mt-16 space-y-4">
          <h2 className="text-lg font-bold text-white">More from the blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/blog/why-anonymous-chat-is-making-a-comeback", label: "Why Anonymous Chat Is Making a Comeback", emoji: "🔒" },
              { href: "/blog/5-conversation-starters-that-actually-work", label: "5 Conversation Starters That Actually Work", emoji: "🚀" },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="bg-surface border border-border rounded-[12px] p-4 hover:border-primary transition-all flex items-start gap-3">
                <span className="text-xl shrink-0">{p.emoji}</span>
                <span className="text-sm font-medium text-textPrimary hover:text-white transition-colors">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

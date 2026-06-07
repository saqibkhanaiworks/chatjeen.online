import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Chat, Privacy & Connection | Chatjeen",
  description:
    "Thoughts on anonymous chat, digital privacy, and the art of talking to strangers. Written by the Chatjeen team.",
  alternates: { canonical: "https://chatjeen.online/blog" },
  openGraph: {
    title: "Chatjeen Blog — Chat, Privacy & Connection",
    description:
      "Thoughts on anonymous chat, digital privacy, and the art of talking to strangers.",
    url: "https://chatjeen.online/blog",
    siteName: "Chatjeen",
    type: "website",
  },
};

const posts = [
  {
    slug: "art-of-talking-to-strangers",
    title: "The Art of Talking to Strangers",
    description:
      "We're told not to talk to strangers. But every meaningful connection started with exactly that. Here's why stranger conversations might be the most underrated skill of our time.",
    category: "Culture",
    emoji: "💬",
    readTime: "5 min read",
    date: "June 2025",
  },
  {
    slug: "why-anonymous-chat-is-making-a-comeback",
    title: "Why Anonymous Chat Is Making a Comeback",
    description:
      "After years of social media demanding our real names, photos, and follower counts, people are quietly returning to anonymous chat. Here's why.",
    category: "Trends",
    emoji: "🔒",
    readTime: "6 min read",
    date: "June 2025",
  },
  {
    slug: "5-conversation-starters-that-actually-work",
    title: "5 Conversation Starters That Actually Work With Strangers",
    description:
      "Most conversation starters fail because they're too safe. Here are five openers that lead to real, memorable conversations — with anyone.",
    category: "Guides",
    emoji: "🚀",
    readTime: "4 min read",
    date: "June 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      <Header />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto w-full flex-1 space-y-14">
        {/* Hero */}
        <section className="space-y-4">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary">
            ✍️ Chatjeen Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Thoughts on chat, privacy &amp; connection.
          </h1>
          <p className="text-textMuted text-base max-w-xl leading-relaxed">
            We write about anonymous conversations, digital privacy, and what happens when strangers actually talk to each other.
          </p>
        </section>

        {/* Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface border border-border rounded-[16px] p-6 flex flex-col justify-between min-h-[240px] hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{post.emoji}</span>
                  <span className="text-[11px] text-textMuted bg-surface2 border border-border px-2.5 py-0.5 rounded-full font-medium">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-textMuted text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                <span className="text-[12px] text-textMuted">{post.date} · {post.readTime}</span>
                <ArrowRight className="w-4 h-4 text-textMuted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="bg-surface border border-border rounded-[20px] p-8 text-center space-y-4">
          <p className="text-white font-semibold text-lg">Ready to have a real conversation?</p>
          <p className="text-textMuted text-sm">No signup. No email. Just talk.</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(124,58,237,0.25)]"
          >
            Start Chatting Free <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

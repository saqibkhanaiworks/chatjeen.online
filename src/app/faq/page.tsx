"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Shield, MessageCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Chatjeen?",
        a: "Chatjeen is a free, AI-powered anonymous chat platform where you can talk to strangers from around the world. Unlike older chat apps that match you randomly, Chatjeen uses AI to pair you with people who share your interests — music, gaming, philosophy, travel, and more. No account, email, or personal info is ever required.",
      },
      {
        q: "How is Chatjeen different from Omegle?",
        a: "Omegle shut down in 2023. Chatjeen is the modern alternative — rebuilt from scratch with AI at its core. Instead of completely random matching, we use AI to connect you with compatible strangers by interests. We also have built-in AI content moderation, AI-generated icebreakers, and a cleaner Gen-Z-first interface.",
      },
      {
        q: "Is Chatjeen free?",
        a: "Yes, 100% free. No premium tier, no paywalls, no ads interrupting your conversations. All features — AI matching, AI icebreakers, AI moderation — are available to every user at no cost.",
      },
    ],
  },
  {
    category: "Privacy & Anonymity",
    questions: [
      {
        q: "Is Chatjeen anonymous?",
        a: "Yes, Chatjeen is fully anonymous. You don't need to create an account or share an email, phone number, or any personal information. You can optionally set a nickname, but it's never verified or tied to your identity. When you end a chat session, the conversation is permanently gone — no logs, no history.",
      },
      {
        q: "Does Chatjeen store my chat logs?",
        a: "No. Chatjeen chat sessions are ephemeral by design. When you disconnect, the conversation is deleted. We do not store message history, user profiles, or conversation data. What happens in Chatjeen, stays in Chatjeen.",
      },
      {
        q: "Does Chatjeen track me?",
        a: "We use minimal analytics (like page view counts via Vercel Analytics) to understand general traffic patterns, but we do not build user profiles, sell your data, or share personal information with advertisers. See our Privacy Policy for full details.",
      },
    ],
  },
  {
    category: "Safety",
    questions: [
      {
        q: "Is Chatjeen safe?",
        a: "Chatjeen has AI-powered real-time content moderation that scans conversations for harmful content and blocks bad actors before they can ruin your experience. You can also instantly report or skip any user with a single click. We recommend following basic internet safety rules: don't share personal information (real name, address, school, phone number) with strangers.",
      },
      {
        q: "What should I do if someone makes me uncomfortable?",
        a: "Hit the 'Skip' button immediately to end the conversation and be matched with someone new. You can also tap 'Report' to flag the user for review. Our AI moderation reviews flagged sessions. If you ever feel unsafe, please leave the chat immediately.",
      },
      {
        q: "Is Chatjeen appropriate for minors?",
        a: "Chatjeen is intended for users aged 18 and over. We use AI moderation to filter inappropriate content, but as with any platform where strangers can chat, we cannot guarantee all content will be appropriate. Parental supervision is recommended for anyone under 18.",
      },
    ],
  },
  {
    category: "Features",
    questions: [
      {
        q: "Do I need an account to use Chatjeen?",
        a: "No. Chatjeen requires zero signup. Open the site, optionally enter a nickname, pick your interests or mood, and start chatting instantly. The whole process takes under 10 seconds.",
      },
      {
        q: "How does AI matching work?",
        a: "When you select interest tags or a conversation mood (like Deep Talk, Music Match, or Gamer Talk), our AI matchmaking queue pairs you with someone who selected similar interests. This results in far better conversations than pure random matching — you already have something in common before you say a word.",
      },
      {
        q: "What are AI icebreakers?",
        a: "When a match is made, Chatjeen's AI generates 3 custom conversation starter suggestions based on your shared interests. These appear as clickable chips in the chat window. You never have to stare at a blank screen wondering what to say.",
      },
      {
        q: "Does Chatjeen have voice chat?",
        a: "Chatjeen is currently focused on delivering the best possible text chat experience. Voice chat is on our roadmap. Follow us for updates on new features.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-[14px] overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-surface hover:bg-surface2 transition-colors"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-white leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 bg-surface border-t border-border">
          <p className="text-[14px] text-textMuted leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.flatMap((cat) =>
              cat.questions.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a,
                },
              }))
            ),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chatjeen.online" },
              { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://chatjeen.online/faq" },
            ],
          }),
        }}
      />

      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 max-w-3xl mx-auto w-full text-center space-y-4">
        <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-primary mb-2">
          <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Frequently Asked Questions
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Got questions?
          <span className="block text-pop-gradient">We got answers.</span>
        </h1>
        <p className="text-textMuted text-base max-w-lg mx-auto leading-relaxed">
          Everything you need to know about Chatjeen — privacy, safety, AI matching, and more.
        </p>
      </section>

      {/* FAQ Sections */}
      <section className="px-4 max-w-3xl mx-auto w-full pb-20 space-y-12">
        {faqs.map((section) => (
          <div key={section.category} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-border pb-3">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center max-w-2xl mx-auto space-y-5">
        <div className="bg-surface border border-primary/30 rounded-[20px] p-8 space-y-4">
          <Shield className="w-8 h-8 text-primary mx-auto" />
          <h2 className="text-2xl font-bold text-white">Still have questions?</h2>
          <p className="text-textMuted text-sm">
            Check out our Safety Guide or start a chat to see Chatjeen in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/safety"
              className="bg-surface2 border border-border text-textPrimary font-medium text-sm px-6 py-3 rounded-full hover:border-primary transition-all"
            >
              Safety Guide
            </Link>
            <Link
              href="/chat"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-1.5 justify-center shadow-[0_0_16px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Chatting Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

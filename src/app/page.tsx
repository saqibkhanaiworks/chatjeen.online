"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Lock, 
  Zap, 
  Bot, 
  Globe, 
  Shield 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeUsers, setActiveUsers] = useState(1420);
  const [nickname, setNickname] = useState("Stranger");

  // Load saved nickname on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatjeen_nickname");
      if (saved) setNickname(saved);
    }
  }, []);

  // Increment active users counter slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next < 800 ? 800 : next > 2400 ? 2400 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mood Roulette Options
  const moodOptions = [
    {
      emoji: "🤔",
      label: "Deep Talk",
      sublabel: "Philosophy, life, the big questions",
      tag: "philosophy"
    },
    {
      emoji: "😂",
      label: "Just Vibes",
      sublabel: "Memes, random stuff, no pressure",
      tag: "memes"
    },
    {
      emoji: "🌍",
      label: "Culture Swap",
      sublabel: "Tell me about where you're from",
      tag: "travel"
    },
    {
      emoji: "🎮",
      label: "Gamer Talk",
      sublabel: "Games, tech, internet culture",
      tag: "gaming"
    },
    {
      emoji: "🎵",
      label: "Music Match",
      sublabel: "Share what you're listening to",
      tag: "music"
    },
    {
      emoji: "🌙",
      label: "2AM Mode",
      sublabel: "Can't sleep. Neither can they.",
      tag: "2am"
    }
  ];

  return (
    <div className="bg-background text-textPrimary min-h-screen relative bg-grain overflow-x-hidden flex flex-col justify-between">
      {/* JSON-LD Schema.org Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://chatjeen.online/#website",
                "url": "https://chatjeen.online",
                "name": "Chatjeen",
                "description": "AI-powered anonymous text chat for Gen-Z."
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://chatjeen.online/#software",
                "name": "Chatjeen",
                "operatingSystem": "All",
                "applicationCategory": "SocialNetworkingApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "AI-native anonymous chat. Match by interests instantly with zero signup."
              }
            ]
          })
        }}
      />

      {/* Subtle floating background bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-10 left-[8%] w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '0s', animationDuration: '10s' }} />
        <div className="absolute bottom-40 right-[8%] w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s', animationDuration: '12s' }} />
      </div>

      <Header />

      {/* HERO SECTION */}
      <section className="pt-36 pb-14 px-4 max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        {/* Subtle radial background behind hero content */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(124,58,237,0.08)_0%,transparent_70%)] z-0" />

        <div className="lg:col-span-7 space-y-7 text-center lg:text-left z-10">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-xs font-medium text-textPrimary">
            AI-powered · 100% free · no signup
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] text-white">
            Talk to Strangers.<br />
            <span className="text-pop-gradient">
              The Good Kind.
            </span>
          </h1>

          <p className="text-lg text-textMuted max-w-[480px] mx-auto lg:mx-0 font-normal leading-relaxed">
            Every conversation is a mystery. Every stranger is a story. No account, no history, no awkward follows — just real talk with real people, anywhere on earth.
          </p>

          <div className="space-y-4 max-w-sm mx-auto lg:mx-0 pt-2">
            <div className="relative">
              <input
                type="text"
                value={nickname === "Stranger" ? "" : nickname}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 15);
                  setNickname(val || "Stranger");
                  if (typeof window !== "undefined") {
                    localStorage.setItem("chatjeen_nickname", val || "Stranger");
                  }
                }}
                placeholder="Enter nickname (optional)..."
                className="w-full py-3 px-5 rounded-full bg-surface2 border border-border focus:border-primary text-sm text-textPrimary placeholder-[#52525B] focus:outline-none focus:ring-3 focus:ring-primary/15 transition-all text-center lg:text-left font-medium"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link 
                href={`/chat?name=${encodeURIComponent(nickname)}`}
                className="bg-primary hover:bg-primary/95 text-white text-base px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 shadow-[0_0_20px_rgba(124,58,237,0.3)] w-full sm:w-auto justify-center"
              >
                Start Chatting Free <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#moods" 
                className="px-8 py-4 rounded-full font-semibold text-textPrimary bg-transparent hover:bg-surface border border-border transition-all duration-200 w-full sm:w-auto text-center"
              >
                Pick a Mood ↓
              </a>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-[13px] text-textMuted font-medium">
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-textMuted" /> Anonymous</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-textMuted" /> Instant match</span>
            <span className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-textMuted" /> AI-powered</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-textMuted" /> Global</span>
          </div>
        </div>

        {/* HERO VISUAL (MOCK CONVO WINDOW CHROME WITH ACCENT SHADOW) */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center z-10">
          <div className="w-full max-w-sm bg-surface border border-border rounded-default relative shadow-[0_0_0_1px_#3F3F46,0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Header bar inside the card */}
            <div className="bg-surface2 border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-textPrimary">Stranger · Brazil 🇧🇷</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="w-2 h-2 rounded-full bg-border" />
              </div>
            </div>

            {/* Conversation Log preview */}
            <div className="p-5 space-y-4">
              {/* Their message bubble */}
              <div className="space-y-1">
                <div className="bg-surface2 p-3.5 rounded-[18px_18px_18px_4px] text-[14px] max-w-[80%] text-textPrimary leading-relaxed">
                  Hey! What kind of music are you into? 🎵
                </div>
              </div>

              {/* Your message bubble */}
              <div className="space-y-1 flex flex-col items-end text-right">
                <div className="bg-primary p-3.5 rounded-[18px_18px_4px_18px] text-[14px] max-w-[80%] text-white leading-relaxed font-medium">
                  Mostly indie pop and late night beats. You? ✨
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex items-center gap-1.5 text-textMuted text-[11px] pl-1 pt-1">
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-textMuted rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }} />
                  <span className="w-1.5 h-1.5 bg-textMuted rounded-full animate-bounce-dot" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1.5 h-1.5 bg-textMuted rounded-full animate-bounce-dot" style={{ animationDelay: '0.3s' }} />
                </div>
                <span>Stranger is typing...</span>
              </div>

              {/* AI Openers Chips */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="text-[11px] text-accent font-bold tracking-wider uppercase flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" /> AI-suggested openers
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="text-[12px] bg-[#EDE9FE] text-primary px-3.5 py-2 rounded-full text-left truncate font-medium flex items-center gap-1 hover:opacity-90 cursor-pointer">
                    <span className="text-[11px]">🤖</span> Who is your favorite indie artist right now?
                  </div>
                  <div className="text-[12px] bg-[#EDE9FE] text-primary px-3.5 py-2 rounded-full text-left truncate font-medium flex items-center gap-1 hover:opacity-90 cursor-pointer">
                    <span className="text-[11px]">🤖</span> If you could only listen to one album forever...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* SOCIAL PROOF BAR */}
      <section className="bg-surface/10 border-y border-border py-4 px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-dot-pulse" />
            <span className="font-semibold text-xs text-textPrimary uppercase tracking-wider">
              {activeUsers.toLocaleString()} people chatting right now
            </span>
          </div>
        </div>
      </section>

      {/* CONVERSATION PREVIEW MARQUEE TICKER */}
      <div className="relative overflow-hidden w-full py-3 bg-surface/20 border-b border-border z-10 group">
        <div className="flex w-max animate-marquee">
          <span className="px-4 text-[13px] text-textMuted font-medium tracking-wide">
            💬 happening now — someone from Japan just taught me how to make ramen 🍜 · been talking to a stranger in Argentina for 2 hours 🌎 · this person guessed my favorite movie correctly 😭 · just had the most unhinged philosophy debate with someone 🤯 · they said something that genuinely changed my perspective · talked to a nurse in Kenya about her day. I cried a little
          </span>
          <span className="px-4 text-[13px] text-textMuted font-medium tracking-wide">
            💬 happening now — someone from Japan just taught me how to make ramen 🍜 · been talking to a stranger in Argentina for 2 hours 🌎 · this person guessed my favorite movie correctly 😭 · just had the most unhinged philosophy debate with someone 🤯 · they said something that genuinely changed my perspective · talked to a nurse in Kenya about her day. I cried a little
          </span>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* CONVERSATION ROULETTE MOOD SELECTOR */}
      <section id="moods" className="py-20 px-4 max-w-5xl mx-auto relative z-10 text-center space-y-12">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            What kind of chat are you in the mood for?
          </h2>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Choose a vibe to bypass tag matching and jump straight into conversations that match your wavelength.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {moodOptions.map((mood, idx) => (
            <Link 
              key={idx}
              href={`/chat?mood=${mood.tag}&name=${encodeURIComponent(nickname)}`}
              className="bg-surface border border-border rounded-[16px] p-5 text-left flex flex-col justify-between hover:border-primary hover:bg-[#1C1830] hover:translate-y-[-2px] transition-all duration-200 group min-h-[160px]"
            >
              <div className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                {mood.emoji}
              </div>
              <div className="space-y-1 mt-4">
                <div className="text-white font-medium text-[15px]">
                  {mood.label}
                </div>
                <div className="text-textMuted text-[13px] leading-tight font-normal">
                  {mood.sublabel}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 max-w-5xl mx-auto relative z-10 text-center space-y-14">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            How it works
          </h2>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Zero friction matchmaking setup. Start talking in under three seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-surface border border-border p-8 rounded-card text-center space-y-4">
            <div className="w-10 h-10 bg-surface2 border border-border rounded-full flex items-center justify-center mx-auto text-sm">
              🎯
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Pick your vibe</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Choose 1–3 interest tags like music, gaming, or food. Or skip it and match randomly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface border border-border p-8 rounded-card text-center space-y-4">
            <div className="w-10 h-10 bg-surface2 border border-border rounded-full flex items-center justify-center mx-auto text-sm">
              🤖
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">AI finds your match</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Our AI pairs you with someone compatible in seconds. Not just random, actually matched.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface border border-border p-8 rounded-card text-center space-y-4">
            <div className="w-10 h-10 bg-surface2 border border-border rounded-full flex items-center justify-center mx-auto text-sm">
              💬
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Chat with an icebreaker</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Get 3 AI-generated conversation starters so you never stare at a blank screen.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* STRANGER STORIES SECTION */}
      <section className="py-20 px-4 max-w-5xl mx-auto relative z-10 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Some conversations stay with you
          </h2>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Real things people said after chatting on Chatjeen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-surface border-left-accent border border-l-0 border-border rounded-r-[12px] p-6 flex flex-col justify-between min-h-[190px]">
            <p className="text-[#FAFAFA] text-[15px] italic leading-relaxed">
              &quot;Asked a stranger what they&apos;d do with one free day. We talked for 3 hours. Still thinking about their answer.&quot;
            </p>
            <div className="mt-4 space-y-2">
              <span className="text-[#71717A] text-[13px] block">
                — anonymous, matched with someone from Germany
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface2 text-[12px] text-textMuted font-medium">
                🤔 Deep Talk
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface border-left-accent border border-l-0 border-border rounded-r-[12px] p-6 flex flex-col justify-between min-h-[190px]">
            <p className="text-[#FAFAFA] text-[15px] italic leading-relaxed">
              &quot;They recommended an album I&apos;d never heard. I&apos;ve listened to it 47 times since. Never got their name.&quot;
            </p>
            <div className="mt-4 space-y-2">
              <span className="text-[#71717A] text-[13px] block">
                — anonymous, matched with someone from Japan
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface2 text-[12px] text-textMuted font-medium">
                🎵 Music Match
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface border-left-accent border border-l-0 border-border rounded-r-[12px] p-6 flex flex-col justify-between min-h-[190px]">
            <p className="text-[#FAFAFA] text-[15px] italic leading-relaxed">
              &quot;I was having the worst day. A stranger in Brazil told me about their terrible day too. We both felt better somehow.&quot;
            </p>
            <div className="mt-4 space-y-2">
              <span className="text-[#71717A] text-[13px] block">
                — anonymous, matched with someone from Brazil
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface2 text-[12px] text-textMuted font-medium">
                😂 Just Vibes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* FEATURE CARDS */}
      <section className="py-20 px-4 bg-surface/10 border-y border-border relative z-10">
        <div className="max-w-5xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Features built for Gen-Z
            </h2>
            <p className="text-sm text-textMuted max-w-md mx-auto">
              We took everything broken about old chat rooms and fixed it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 - Prominent AI Safety Card */}
            <div className="bg-surface border-primary border-[1.5px] p-6 rounded-card flex gap-4 items-start shadow-md shadow-primary/5">
              <div className="p-2.5 bg-primary/10 border border-primary text-primary rounded-default shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">Built-In AI Safety</h3>
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded uppercase">Active</span>
                </div>
                <p className="text-xs text-textMuted leading-relaxed">
                  Real-time content moderation catches bad actors before they ruin the vibe. Instant report + skip keeps you secure.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start">
              <div className="p-2.5 bg-surface2 border border-border text-textPrimary shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">AI-Matched, Not Random</h3>
                <p className="text-xs text-textMuted leading-relaxed">
                  Most chat apps throw you at a random person. We match by shared interests. Better convos, guaranteed.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start">
              <div className="p-2.5 bg-surface2 border border-border text-textPrimary shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">Zero Identity, Zero Logs</h3>
                <p className="text-xs text-textMuted leading-relaxed">
                  No email. No phone. No account. Sessions are ephemeral. When you leave, the chat never existed.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start">
              <div className="p-2.5 bg-surface2 border border-border text-textPrimary shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">One Click, Instant Match</h3>
                <p className="text-xs text-textMuted leading-relaxed">
                  Longest you will ever wait is 3 seconds. We keep a live matchmaking queue so you are never stuck waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* COMPARISON TABLE */}
      <section className="py-20 px-4 max-w-4xl mx-auto relative z-10 space-y-14">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Built for conversation. Not for anything else.
          </h2>
          <p className="text-sm text-textMuted">
            The hard facts comparing us to competitors.
          </p>
        </div>

        <div className="overflow-x-auto rounded-card border border-border bg-surface">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface2 text-[11px] font-semibold text-textMuted uppercase tracking-wider">
                <th className="p-4 font-bold">Feature</th>
                <th className="p-4 text-primary font-bold">Chatjeen</th>
                <th className="p-4 font-medium">Omegle</th>
                <th className="p-4 font-medium">Emerald Chat</th>
                <th className="p-4 font-medium">OmeTV</th>
                <th className="p-4 font-medium">Chatib</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs text-textMuted">
              <tr>
                <td className="p-4 font-bold text-textPrimary">Conversation Quality</td>
                <td className="p-4 text-green-500 font-semibold">✅ AI-matched by mood</td>
                <td className="p-4">❌ Pure random</td>
                <td className="p-4">⚠️ Interest tags only</td>
                <td className="p-4">❌ Video random</td>
                <td className="p-4">❌ No matching</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">AI Matching</td>
                <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                <td className="p-4">❌ No</td>
                <td className="p-4">❌ No</td>
                <td className="p-4">❌ No</td>
                <td className="p-4">❌ No</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">AI Icebreakers</td>
                <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                <td className="p-4">❌ No</td>
                <td className="p-4">❌ No</td>
                <td className="p-4">❌ No</td>
                <td className="p-4">❌ No</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">No Signup</td>
                <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-accent">⚠️ Paywall</td>
                <td className="p-4">❌ No</td>
                <td className="p-4 text-green-500">✅ Yes</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">Free</td>
                <td className="p-4 text-green-500 font-semibold">✅ 100%</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-accent">⚠️ Limited</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-accent">⚠️ Ads</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">Text Chat</td>
                <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">AI Moderation</td>
                <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                <td className="p-4">❌ No</td>
                <td className="p-4 text-accent">⚠️ Basic</td>
                <td className="p-4 text-accent">⚠️ Manual</td>
                <td className="p-4">❌ No</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-textPrimary">Still Alive</td>
                <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                <td className="p-4">❌ Dead</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
                <td className="p-4 text-green-500">✅ Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#18181B]" />

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 text-center relative z-10 max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Your next favorite conversation is one click away.
        </h2>
        <p className="text-sm text-textMuted max-w-md mx-auto">
          No account. No history. No screenshots. Just talk.
        </p>
        <div className="pt-2">
          <Link 
            href="/chat" 
            className="bg-primary hover:bg-primary/95 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(124,58,237,0.3)] inline-flex items-center gap-1.5"
          >
            Start a Chat &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

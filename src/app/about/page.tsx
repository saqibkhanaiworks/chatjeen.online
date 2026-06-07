"use client";

import React, { useState } from "react";
import { Bot, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [bannerActive, setBannerActive] = useState(false);

  return (
    <div className="bg-background text-textPrimary min-h-screen relative bg-grain overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic background blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)] z-0" />
      <div className="absolute bottom-1/3 left-[10%] w-72 h-72 rounded-full pointer-events-none bg-primary/5 blur-3xl z-0" />

      {/* NAVBAR */}
      <Header onBannerStateChange={setBannerActive} />

      {/* HERO & CONTENT */}
      <main 
        className={`pb-20 px-4 max-w-4xl mx-auto space-y-16 flex-1 w-full relative z-10 transition-all duration-300 ${
          bannerActive ? "pt-40" : "pt-32"
        }`}
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-primary uppercase tracking-wider">
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            We built the chat app we always wanted
          </h1>
          <p className="text-lg text-textMuted max-w-xl mx-auto leading-relaxed">
            Anonymous chat used to be fun. Then bots, advertisement walls, and creepiness ruined it. We are fixing that with AI.
          </p>
        </div>

        {/* CORE VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border p-6 rounded-card space-y-3 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 bg-surface2 border border-border text-textMuted group-hover:text-primary group-hover:border-primary/20 rounded-default flex items-center justify-center font-bold transition-all duration-300">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">AI-First</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              We match people based on shared vibes. AI suggests openers to kill awkward silences instantly.
            </p>
          </div>

          <div className="bg-surface border border-border p-6 rounded-card space-y-3 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 bg-surface2 border border-border text-textMuted group-hover:text-primary group-hover:border-primary/20 rounded-default flex items-center justify-center font-bold transition-all duration-300">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">Anonymous</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              No registration. No tracking. We store zero logs. When a conversation finishes, it disappears forever.
            </p>
          </div>

          <div className="bg-surface border border-border p-6 rounded-card space-y-3 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 bg-surface2 border border-border text-textMuted group-hover:text-primary group-hover:border-primary/20 rounded-default flex items-center justify-center font-bold transition-all duration-300">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">Free Forever</h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Zero pricing tiers. Zero subscriptions. Chatjeen is entirely free. Just click a button and start chatting.
            </p>
          </div>
        </div>

        {/* TECH STACK EXPLANATION */}
        <div className="bg-surface border border-border p-8 rounded-card space-y-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-pop to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Powering the Magic</h2>
          <p className="text-sm text-textMuted leading-relaxed">
            Chatjeen runs on a modern high-speed technology stack. Our client utilizes Next.js 14 App Router for rapid page load times and perfect SEO compatibility. The real-time messaging server relies on Node.js and Socket.io to keep matching latency under 3 seconds.
          </p>
          <p className="text-sm text-textMuted leading-relaxed">
            For smart matching, content filtering, and prompt generation, we use the Google Gemini API. This is integrated utilizing the Google Antigravity stack, allowing us to build secure, robust AI workflows that keep the conversation friendly, engaging, and safe.
          </p>
        </div>

        {/* TEAM SECTION */}
        <div className="text-center space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">The Team</h2>
          <p className="text-sm text-textMuted max-w-lg mx-auto leading-relaxed">
            We are a small team that thinks anonymous chat deserves better than bots and bad actors. We built Chatjeen to bring back the golden age of meeting strangers online, minus the weird stuff.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

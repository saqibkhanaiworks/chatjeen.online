"use client";

import React, { useState } from "react";
import { Shield, RefreshCw, EyeOff, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SafetyPage() {
  const [bannerActive, setBannerActive] = useState(false);

  return (
    <div className="bg-background text-textPrimary min-h-screen relative bg-grain overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic background blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)] z-0" />
      <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full pointer-events-none bg-primary/5 blur-3xl z-0" />

      {/* NAVBAR */}
      <Header onBannerStateChange={setBannerActive} />

      {/* HERO & CONTENT */}
      <main 
        className={`pb-20 px-4 max-w-3xl mx-auto space-y-12 flex-1 w-full relative z-10 transition-all duration-300 ${
          bannerActive ? "pt-40" : "pt-32"
        }`}
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-primary uppercase tracking-wider">
            Trust & Safety
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Your safety is the product
          </h1>
          <p className="text-lg text-textMuted max-w-xl mx-auto leading-relaxed">
            We use smart systems to protect your privacy and shield you from bad actors. Here is how we keep Chatjeen clean.
          </p>
        </div>

        {/* 2X2 GRID OR LIST OF SEGMENTS */}
        <div className="space-y-6">
          
          {/* How AI Moderation Works */}
          <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start hover:border-primary/40 transition-all duration-300 group">
            <div className="p-3 bg-surface2 border border-border text-textMuted group-hover:text-primary group-hover:border-primary/20 shrink-0 rounded-default transition-all duration-300">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">How AI moderation works</h2>
              <p className="text-sm text-textMuted leading-relaxed font-normal">
                Every text message goes through local filters to block phone numbers and emails instantly. Next, our backend runs real-time AI moderation using Google Gemini to screen out harassment, abusive language, and sexual topics. Messages that fail are blocked instantly.
              </p>
            </div>
          </div>

          {/* Skip & Report */}
          <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start hover:border-accent/40 transition-all duration-300 group">
            <div className="p-3 bg-surface2 border border-border text-textMuted group-hover:text-accent group-hover:border-accent/20 shrink-0 rounded-default transition-all duration-300">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">Uncomfortable? Skip or Report</h2>
              <p className="text-sm text-textMuted leading-relaxed font-normal">
                You hold full control of your chat. If a match behaves awkwardly, tap the skip button to break the connection instantly. If they break community rules, hit the report button. Reporting disconnects the chat and blocks that user from matching with you again.
              </p>
            </div>
          </div>

          {/* Privacy & Storage */}
          <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start hover:border-primary/40 transition-all duration-300 group">
            <div className="p-3 bg-surface2 border border-border text-textMuted group-hover:text-primary group-hover:border-primary/20 shrink-0 rounded-default transition-all duration-300">
              <EyeOff className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">What we never store</h2>
              <p className="text-sm text-textMuted leading-relaxed font-normal">
                We believe in total privacy. We do not store chat histories, user account databases, emails, or hardware IDs. All session matching data resides temporarily in-memory. Once you disconnect from the room, the conversation disappears forever.
              </p>
            </div>
          </div>

          {/* Zero Tolerance */}
          <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start hover:border-danger/40 transition-all duration-300 group">
            <div className="p-3 bg-surface2 border border-border text-textMuted group-hover:text-danger group-hover:border-danger/20 shrink-0 rounded-default transition-all duration-300">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-danger tracking-tight group-hover:text-danger transition-colors">Zero tolerance policy</h2>
              <p className="text-sm text-textMuted leading-relaxed font-normal">
                Chatjeen is a friendly space. We immediately ban users flagged for sharing explicit media links, spamming advertisements, or sending abusive comments. Our moderation system is active 24/7 to suspend bad actors.
              </p>
            </div>
          </div>

        </div>

        {/* COMMUNITY GUIDELINES */}
        <div className="bg-surface border border-border p-8 rounded-card space-y-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-pop to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h2 className="text-2xl font-bold text-white tracking-tight text-center">Community Guidelines</h2>
          <div className="space-y-5 text-sm">
            <div className="flex gap-4 items-start group/item">
              <div className="w-6 h-6 rounded-full bg-surface2 border border-border text-primary group-hover/item:bg-primary group-hover/item:text-white flex items-center justify-center font-bold shrink-0 text-xs transition-colors duration-200">1</div>
              <div>
                <strong className="text-white">Keep it respectful.</strong> Treat your partner with decency. Harassment, threats, and hate speech are not allowed.
              </div>
            </div>
            <div className="flex gap-4 items-start group/item">
              <div className="w-6 h-6 rounded-full bg-surface2 border border-border text-primary group-hover/item:bg-primary group-hover/item:text-white flex items-center justify-center font-bold shrink-0 text-xs transition-colors duration-200">2</div>
              <div>
                <strong className="text-white">Protect your privacy.</strong> Do not share phone numbers, social handles, or physical addresses. Anonymity is your superpower.
              </div>
            </div>
            <div className="flex gap-4 items-start group/item">
              <div className="w-6 h-6 rounded-full bg-surface2 border border-border text-primary group-hover/item:bg-primary group-hover/item:text-white flex items-center justify-center font-bold shrink-0 text-xs transition-colors duration-200">3</div>
              <div>
                <strong className="text-white">No commercial spam.</strong> Do not sell services, broadcast links, or distribute ads. Chatjeen is for real human conversations.
              </div>
            </div>
            <div className="flex gap-4 items-start group/item">
              <div className="w-6 h-6 rounded-full bg-surface2 border border-border text-primary group-hover/item:bg-primary group-hover/item:text-white flex items-center justify-center font-bold shrink-0 text-xs transition-colors duration-200">4</div>
              <div>
                <strong className="text-white">No explicit content.</strong> Verbal abuse, sexual solicitation, or inappropriate descriptions will trigger our automated filters and lead to a ban.
              </div>
            </div>
            <div className="flex gap-4 items-start group/item">
              <div className="w-6 h-6 rounded-full bg-surface2 border border-border text-primary group-hover/item:bg-primary group-hover/item:text-white flex items-center justify-center font-bold shrink-0 text-xs transition-colors duration-200">5</div>
              <div>
                <strong className="text-white">Use flags responsibly.</strong> Only report players who break rules. Abuse of the report tool is subject to review.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

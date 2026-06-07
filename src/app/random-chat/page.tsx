"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RandomChatPage() {
  const [bannerActive, setBannerActive] = useState(false);

  return (
    <div className="bg-background text-textPrimary min-h-screen relative bg-grain overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic background blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)] z-0" />
      <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full pointer-events-none bg-primary/5 blur-3xl z-0" />

      {/* NAVBAR */}
      <Header onBannerStateChange={setBannerActive} />

      {/* CONTENT */}
      <main 
        className={`pb-20 px-4 max-w-3xl mx-auto space-y-12 flex-1 w-full relative z-10 transition-all duration-300 ${
          bannerActive ? "pt-40" : "pt-32"
        }`}
      >
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-primary uppercase tracking-wider">
            Random Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Random Chat: But Smarter Than You&apos;ve Ever Tried
          </h1>
          <p className="text-lg text-textMuted font-normal leading-relaxed max-w-2xl mx-auto">
            Staring at a blank screen waiting for a random match is boring. Chatjeen updates the classic random chat concept with smart interest matching and automated icebreakers.
          </p>
        </div>

        {/* SECTION 1 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">The problem with pure random chat</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Traditional random chat apps are a roll of the dice. You click connect, and you are thrown into a room with a random person. Half the time, they skip you in one second. The other half, they do not speak the same language, or they write something offensive. This pure random approach leads to bad conversations and wasted time.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            People get bored because they have nothing in common. When you match with someone who does not share your hobbies, you struggle to think of anything to say. You write a dry hello, they respond with a dry hi, and the chat dies.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">How AI matching makes it better</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Chatjeen fixes this. We do not throw you at random profiles. Instead, we ask you to pick one to three tags representing your current mood. These can be music, gaming, philosophy, or memes. Our matching server searches the active queue to find someone who shares those tags.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            This means you start the conversation with shared ground. If you both selected music, you can talk about your favorite albums. If you both chose gaming, you can discuss recent releases. The conversation feels natural from the start.
          </p>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
          <div className="bg-surface border border-border p-6 rounded-card text-center space-y-2 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-200">3s</div>
            <div className="text-xs text-textMuted">Max matching wait time</div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-card text-center space-y-2 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-200">120+</div>
            <div className="text-xs text-textMuted">Countries active daily</div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-card text-center space-y-2 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-200">100%</div>
            <div className="text-xs text-textMuted">Free with zero signup</div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">How it works step by step</h2>
          <div className="space-y-4 text-sm text-textMuted">
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">Step 1:</span>
              <span><strong className="text-textPrimary">Choose your tags.</strong> Select up to three tags that describe your interests. Or skip this part to match randomly.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">Step 2:</span>
              <span><strong className="text-textPrimary">Enter the queue.</strong> Our algorithm scans the lobby. It pairs you with a compatible user based on your tags.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">Step 3:</span>
              <span><strong className="text-textPrimary">Break the ice.</strong> We give you three AI conversation starters tailored to your shared interests. Tap one to begin.</span>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface border border-border p-8 rounded-card text-center space-y-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-pop to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Ready to match?</h3>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Meet compatible strangers instantly. No credentials required.
          </p>
          <div>
            <Link 
              href="/chat" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm inline-flex items-center gap-1.5"
            >
              Start Matching Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

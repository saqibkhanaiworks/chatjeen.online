"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OmegleAlternativePage() {

  return (
    <div className="bg-background text-textPrimary min-h-screen relative bg-grain overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic background blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)] z-0" />
      <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full pointer-events-none bg-primary/5 blur-3xl z-0" />

      {/* NAVBAR */}
      <Header />

      {/* CONTENT */}
      <main className="pb-20 px-4 max-w-3xl mx-auto space-y-12 flex-1 w-full relative z-10 pt-32">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-primary uppercase tracking-wider">
            Omegle Alternative
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            The Best Omegle Alternative in 2026
          </h1>
          <p className="text-lg text-textMuted font-normal leading-relaxed max-w-2xl mx-auto">
            Omegle shut down and left a massive void. Most replacements are filled with bots or locked behind paywalls. Chatjeen offers a fresh, smart, and safe way to talk to strangers.
          </p>
        </div>

        {/* SECTION 1 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Why Omegle shut down and what users lost</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Omegle was the original home of random chat. It ran for over fourteen years before closing its doors. The site struggled to fight bad actors and handle moderation. When it went offline, millions of people lost their favorite way to make quick friends. Users missed the fun of matching with a random stranger across the globe.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            But Omegle had huge flaws. You had to scroll through dozens of bots and advertisements. Creepy conversations were everywhere. There was no safety layer to block offensive text. Chatjeen takes the core concept of meeting strangers and rebuilds it with modern intelligence. We keep the raw fun and throw out the trash.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">What makes a good Omegle alternative in 2026</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            A real replacement needs to be fast and free. You should not have to pay just to talk. Good alternatives must also block bots. Nobody wants to chat with a computer script selling webcam services. Most importantly, it needs to protect your data. You should never have to input your email address or link a social profile to begin.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Chatjeen checks every single box. We match you with real users in under three seconds. We do not track your IP address or save log files. We use smart algorithms to filter bad behavior before it hits your screen.
          </p>
        </section>

        {/* COMPARISON */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight text-center sm:text-left">How we compare</h2>
          <div className="overflow-x-auto rounded-card border border-border bg-surface shadow-xl shadow-black/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface2 text-xs font-bold text-textMuted uppercase tracking-wider">
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-primary font-bold">Chatjeen</th>
                  <th className="p-4 font-medium">Emerald Chat</th>
                  <th className="p-4 font-medium">OmeTV</th>
                  <th className="p-4 font-medium">Knotchat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs text-textMuted">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-textPrimary">AI Interest Match</td>
                  <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                  <td className="p-4">❌ No</td>
                  <td className="p-4">❌ No</td>
                  <td className="p-4">❌ No</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-textPrimary">AI Icebreakers</td>
                  <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                  <td className="p-4">❌ No</td>
                  <td className="p-4">❌ No</td>
                  <td className="p-4">❌ No</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-textPrimary">No Registration</td>
                  <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                  <td className="p-4 text-accent">⚠️ Paywall</td>
                  <td className="p-4">❌ No</td>
                  <td className="p-4 text-green-500">✅ Yes</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-textPrimary">100% Free</td>
                  <td className="p-4 text-green-500 font-semibold">✅ Yes</td>
                  <td className="p-4 text-accent">⚠️ Limited</td>
                  <td className="p-4 text-green-500">✅ Yes</td>
                  <td className="p-4 text-accent">⚠️ Ads</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Why Chatjeen is different</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            We do not just match you with a random stranger. We use smart processing to pair you based on shared interests. If you love gaming, you will talk to gamers. If you like travel, you will match with travelers. This makes conversations flow naturally.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            We also solve the problem of awkward silence. Staring at a blank chat screen is painful. Our AI reads your shared interest tags and cooks up three quick conversation starters. Tap a chip to break the ice instantly.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-surface border border-border p-8 rounded-card text-center space-y-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-pop to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Ready to meet real people?</h3>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Try Chatjeen today. No signup, no fees. Just pure conversation.
          </p>
          <div>
            <Link 
              href="/chat" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm inline-flex items-center gap-1.5"
            >
              Start Chatting Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AnonymousChatPage() {
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
            Anonymous Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Anonymous Chat: Talk Freely Without Revealing Who You Are
          </h1>
          <p className="text-lg text-textMuted font-normal leading-relaxed max-w-2xl mx-auto">
            Real privacy is hard to find online. Most chat apps ask for phone numbers, emails, or Google logins. Chatjeen gives you a space to chat anonymously with zero friction.
          </p>
        </div>

        {/* SECTION 1 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">What real anonymity means</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Many websites promise privacy but sell your data behind your back. They track your device fingerprint, store your IP addresses, and keep logs of everything you write. That is not private. Real anonymity means you are a ghost. You step into a room, share a conversation, and leave without leaving a trace.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            On Chatjeen, you do not need to register. You do not need to create a profile picture or select a username. The person on the other end only knows what you choose to tell them. When you exit the room, that connection is severed, and the messages vanish from existence.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">How we protect your identity technically</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            We built Chatjeen from the ground up to respect your privacy. All messaging transactions happen in-memory. We do not connect to a database to log your conversations. Once you exit a chat session, the server deletes the virtual room instantly.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            To keep you safe from sharing personal details by accident, we run a client-side filter. If you type a phone number, email address, or social handle, the app blocks the message and reminds you to keep it anonymous. This keeps your private details secure.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Benefits of anonymous conversation</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Anonymity removes pressure. You can share your true opinions, vent about your day, or discuss hobbies without fear of judgment. You might talk to an art student in Italy, a software developer in Tokyo, or a gamer in Chicago. 
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Without profile photos or bio descriptions, you match based on shared interests. You talk about music, movies, or memes. The conversations are more honest because there is no social status to maintain.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Safety features</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Privacy does not mean chaos. We use smart filters to identify bad behavior. Our server runs automated text checks using Google Gemini. This lets us flag abusive words or harassment before they bother you. If your partner makes you uncomfortable, tap report. They will be blacklisted from matching with you again, and we handle the rest.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-surface border border-border p-8 rounded-card text-center space-y-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-pop to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Talk to someone new today</h3>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Experience real privacy. Jump into a chat right now.
          </p>
          <div>
            <Link 
              href="/chat" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm inline-flex items-center gap-1.5"
            >
              Start Anonymous Chat <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

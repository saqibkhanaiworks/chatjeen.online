"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, UserX, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FreeChatNoSignupPage() {
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
            No Signup Chat
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Free Chat With Zero Signup Friction
          </h1>
          <p className="text-lg text-textMuted font-normal leading-relaxed max-w-2xl mx-auto">
            Most modern apps force you to create an account, verify a phone number, or sign in with Google. We believe meeting people should be simple, instant, and completely free.
          </p>
        </div>

        {/* SECTION 1 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Why signup walls kill chat apps</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Signup gates destroy the fun of talking to strangers. Meeting people online should be a quick, spontaneous activity. If you have to spend five minutes entering your email, creating a password, verifying a link, and setting up a profile, the mood is gone. These gates exist to collect your personal info so companies can target you with ads.
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Furthermore, registration databases leak. When you sign up for a random chat site, your personal information is stored on their servers. If those servers get breached, your email, password, and chat logs can end up on the web. A truly secure chat room is one that never asks for your credentials in the first place.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Chatjeen&apos;s one-click philosophy</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            We built Chatjeen to be friction-free. We do not ask for your email address, phone number, or age. You do not need a password. You simply visit the site, choose your interests, and hit connect. You are instantly matched with another active human being. 
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            This approach keeps the app fast and accessible. It means you can start a conversation in the middle of the night, during a break, or whenever you feel like meeting someone new. There are no forms to fill out and no profiles to build.
          </p>
        </section>

        {/* DETAILS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
          <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start hover:border-primary/30 transition-all duration-300 group">
            <div className="p-2.5 bg-surface2 border border-border rounded-default text-textMuted group-hover:text-primary group-hover:border-primary/20 shrink-0 transition-all duration-300">
              <UserX className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors">No Accounts</h3>
              <p className="text-xs text-textMuted leading-relaxed">We collect zero emails or phone numbers. Complete privacy.</p>
            </div>
          </div>

          <div className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start hover:border-primary/30 transition-all duration-300 group">
            <div className="p-2.5 bg-surface2 border border-border rounded-default text-textMuted group-hover:text-primary group-hover:border-primary/20 shrink-0 transition-all duration-300">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors">Instant Setup</h3>
              <p className="text-xs text-textMuted leading-relaxed">Click a button, match with a real user, and start chatting.</p>
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">What you get for free</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Many chat apps claim to be free but limit your matches or put core features behind paywalls. They charge you to match by interests, filter by region, or unlock conversation suggestions. 
          </p>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Chatjeen is 100% free. You get full access to our matching queue, active country indicators, AI icebreaker suggestions, and automated safety moderation. There are no hidden fees, credits, or premium plans.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4 bg-surface/40 border border-border/60 p-6 rounded-card hover:border-primary/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white tracking-tight">Privacy by design</h2>
          <p className="text-sm text-textMuted leading-relaxed font-normal">
            Because we do not store accounts, we store zero user histories. When you end a chat, the messages are deleted immediately. Our servers maintain transient, in-memory sockets only. The minute you disconnect, the chat room is wiped clean. It is the safest way to chat because we cannot lose data we never collected.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-surface border border-border p-8 rounded-card text-center space-y-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-pop to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Ready to talk instantly?</h3>
          <p className="text-sm text-textMuted max-w-md mx-auto">
            Try the most frictionless chat app online. Start chatting free.
          </p>
          <div>
            <Link 
              href="/chat" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm inline-flex items-center gap-1.5"
            >
              Start Chatting Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

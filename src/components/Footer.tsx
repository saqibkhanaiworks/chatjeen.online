"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 px-4 relative z-10 text-center md:text-left w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Brand */}
        <div className="md:col-span-4 space-y-3">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-primary hover:opacity-90 transition-opacity">
            chatjeen
          </Link>
          <p className="text-xs text-textMuted">
            AI-powered anonymous chat. Built for humans.
          </p>
          <div className="text-[11px] text-textMuted/50 font-normal">
            No logs. No tracking. No drama.
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-medium">
          {/* App */}
          <div className="space-y-3">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">App</div>
            <ul className="space-y-2">
              <li><Link href="/chat" className="text-textMuted hover:text-white transition-colors">Start Chatting</Link></li>
              <li><Link href="/about" className="text-textMuted hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/safety" className="text-textMuted hover:text-white transition-colors">Safety Guide</Link></li>
              <li><Link href="/faq" className="text-textMuted hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-textMuted hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* SEO Landers */}
          <div className="space-y-3">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">Explore</div>
            <ul className="space-y-2">
              <li><Link href="/omegle-alternative" className="text-textMuted hover:text-white transition-colors">Omegle Alternative</Link></li>
              <li><Link href="/anonymous-chat" className="text-textMuted hover:text-white transition-colors">Anonymous Chat</Link></li>
              <li><Link href="/random-chat" className="text-textMuted hover:text-white transition-colors">Random Chat</Link></li>
              <li><Link href="/voice-chat" className="text-textMuted hover:text-white transition-colors">Voice Chat</Link></li>
              <li><Link href="/talk-to-strangers" className="text-textMuted hover:text-white transition-colors">Talk to Strangers</Link></li>
            </ul>
          </div>

          {/* More */}
          <div className="space-y-3">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">More</div>
            <ul className="space-y-2">
              <li><Link href="/free-chat-no-signup" className="text-textMuted hover:text-white transition-colors">No Signup Chat</Link></li>
              <li><Link href="/online-chat-rooms" className="text-textMuted hover:text-white transition-colors">Chat Rooms</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">Legal</div>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-textMuted hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-textMuted hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/safety" className="text-textMuted hover:text-white transition-colors">Community Rules</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-center text-[11px] text-textMuted/40">
        &copy; {new Date().getFullYear()} Chatjeen. All rights reserved. &nbsp;·&nbsp;
        <Link href="/privacy" className="hover:text-textMuted transition-colors">Privacy</Link>
        &nbsp;·&nbsp;
        <Link href="/terms" className="hover:text-textMuted transition-colors">Terms</Link>
      </div>
    </footer>
  );
}

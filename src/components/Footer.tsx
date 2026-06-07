"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 px-4 relative z-10 text-center md:text-left w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 space-y-3">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-primary hover:opacity-90 transition-opacity">
            chatjeen
          </Link>
          <p className="text-xs text-textMuted">
            Chatjeen — AI-native anonymous chat. Built for humans.
          </p>
          <div className="text-[11px] text-textMuted/50 font-normal">
            No logs. No tracking. No drama.
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-medium">
          <div className="space-y-3">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">App</div>
            <ul className="space-y-2">
              <li><Link href="/chat" className="text-textMuted hover:text-white transition-colors">Start Chatting</Link></li>
              <li><Link href="/about" className="text-textMuted hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/safety" className="text-textMuted hover:text-white transition-colors">Safety Guide</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">SEO Landers</div>
            <ul className="space-y-2">
              <li><Link href="/omegle-alternative" className="text-textMuted hover:text-white transition-colors">Omegle Alternative</Link></li>
              <li><Link href="/anonymous-chat" className="text-textMuted hover:text-white transition-colors">Anonymous Chat</Link></li>
              <li><Link href="/random-chat" className="text-textMuted hover:text-white transition-colors">Random Chat</Link></li>
            </ul>
          </div>

          <div className="space-y-3 col-span-2 sm:col-span-1">
            <div className="font-bold text-textPrimary uppercase tracking-wider text-[10px]">Legal</div>
            <ul className="space-y-2">
              <li><Link href="/free-chat-no-signup" className="text-textMuted hover:text-white transition-colors">No Signup Chat</Link></li>
              <li><Link href="/safety" className="text-textMuted hover:text-white transition-colors">Community Rules</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-center text-[11px] text-textMuted/40">
        &copy; {new Date().getFullYear()} Chatjeen. All rights reserved.
      </div>
    </footer>
  );
}

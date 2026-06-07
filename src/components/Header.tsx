"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { isWorldCupActive } from "@/app/fanzone/wcData";
import { ArrowRight, Shield } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showFanZone, setShowFanZone] = useState(false);
  const [nickname, setNickname] = useState("Stranger");

  useEffect(() => {
    setShowFanZone(isWorldCupActive());

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatjeen_nickname");
      if (saved) setNickname(saved);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* WORLD CUP FAN ZONE BANNER */}
      {showFanZone && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#7C3AED] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(124,58,237,0.3)] animate-pulse-subtle">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
          </span>
          <Link href="/fanzone" className="hover:underline flex items-center gap-1.5 transition-all">
            <span>⚽ World Cup Fan Zone — Live Now</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Join Room &rarr;</span>
          </Link>
        </div>
      )}

      {/* NAVBAR */}
      <nav 
        className={`fixed ${showFanZone ? "top-[40px]" : "top-0"} left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border py-3.5 shadow-lg shadow-black/10" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-semibold tracking-tight text-primary hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            chatjeen
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link 
              href="/faq" 
              className="text-[13px] font-medium text-textMuted hover:text-white transition-colors hidden sm:block"
            >
              FAQ
            </Link>
            <Link 
              href="/safety" 
              className="text-[13px] font-medium text-textMuted hover:text-white transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Safe Chat</span>
            </Link>
            <Link 
              href={`/chat?name=${encodeURIComponent(nickname)}`}
              className="bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-primary/20 flex items-center gap-1"
            >
              <span>Start Chatting</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

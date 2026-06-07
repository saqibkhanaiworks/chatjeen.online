"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, Award } from "lucide-react";
import { countries, isWorldCupActive, getFlagUrl } from "./wcData";

export default function FanZonePickerPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [checkingActive, setCheckingActive] = useState(true);

  // Check World Cup Fan Zone active dates
  useEffect(() => {
    if (!isWorldCupActive()) {
      router.replace("/");
    } else {
      setCheckingActive(false);
      // Pre-populate from sessionStorage if exists
      const saved = sessionStorage.getItem("wcTeam");
      if (saved && countries.some((c) => c.slug === saved)) {
        setSelectedTeam(saved);
      }
    }
  }, [router]);

  if (checkingActive) {
    return (
      <div className="bg-background text-textPrimary h-screen flex flex-col items-center justify-center bg-grain">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-textMuted font-medium tracking-wide">Loading Fan Zone...</p>
        </div>
      </div>
    );
  }

  // Filter nations
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (slug: string) => {
    setSelectedTeam(slug);
  };

  const handleJoin = () => {
    if (!selectedTeam) return;
    sessionStorage.setItem("wcTeam", selectedTeam);
    router.push(`/fanzone/${selectedTeam}`);
  };

  return (
    <div className="bg-background text-textPrimary min-h-screen relative bg-grain overflow-x-hidden flex flex-col justify-between">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary hover:opacity-90 transition-opacity">
            <span>chatjeen</span>
            <span className="bg-primary/20 text-primary border border-primary/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              🏆 Fan Zone
            </span>
          </Link>
          <Link
            href="/"
            className="text-[13px] font-medium text-textMuted hover:text-white transition-colors flex items-center gap-1 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full px-4 pt-28 pb-32 flex-1 flex flex-col space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto pt-4">
          <div className="inline-flex items-center bg-surface2 border border-border px-3.5 py-1 rounded-full text-[11px] font-bold text-accent uppercase tracking-wider gap-1">
            <Award className="w-3.5 h-3.5" /> World Cup 2026 Live Arena
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Who are you supporting? ⚽
          </h1>
          <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
            Join your nation&apos;s exclusive, anonymous chat room. Cheer with fellow fans, trash-talk rivals in real time, and celebrate goals together.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country (e.g. Brazil, Argentina, USA)..."
            className="w-full py-3.5 pl-11 pr-4 rounded-full bg-surface border border-border focus:border-primary text-sm text-textPrimary placeholder-[#52525B] focus:outline-none focus:ring-3 focus:ring-primary/15 transition-all font-medium"
          />
        </div>

        {/* Nations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {filteredCountries.map((c) => {
            const isSelected = selectedTeam === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => handleSelect(c.slug)}
                className={`p-4 rounded-default border text-left flex flex-col justify-between items-center text-center transition-all duration-200 group relative select-none cursor-pointer min-h-[120px] ${
                  isSelected
                    ? "bg-[#1C1830] border-primary shadow-[0_0_15px_rgba(124,58,237,0.15)] translate-y-[-2px]"
                    : "bg-surface border-border hover:border-textMuted hover:bg-[#151518] hover:translate-y-[-1px]"
                }`}
              >
                {/* Selecting Dot */}
                <div className="absolute top-2.5 right-2.5 flex items-center justify-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-border bg-transparent group-hover:border-textMuted"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white animate-scale-up" />}
                  </div>
                </div>

                <div className="w-14 h-9 relative mb-3 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center overflow-hidden rounded border border-border/30 bg-surface2 shadow-sm">
                  <img
                    src={getFlagUrl(c.code)}
                    alt={`${c.name} Flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-xs leading-snug tracking-wide">
                    {c.name}
                  </div>
                  <div className="text-[10px] text-textMuted font-bold uppercase tracking-widest mt-0.5">
                    {c.code}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCountries.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-sm text-textMuted font-medium">No countries match &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-primary hover:underline font-semibold"
            >
              Clear search filter
            </button>
          </div>
        )}
      </main>

      {/* Floating Bottom CTA Bar */}
      {selectedTeam && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-border py-4 px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] animate-slide-up">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {(() => {
                const sel = countries.find((c) => c.slug === selectedTeam);
                return sel ? (
                  <div className="w-10 h-7 overflow-hidden rounded border border-border/40 bg-surface2 flex items-center justify-center shrink-0 shadow">
                    <img
                      src={getFlagUrl(sel.code)}
                      alt={sel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null;
              })()}
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest">Supporting</span>
                <h4 className="text-sm font-bold text-white">
                  {countries.find((c) => c.slug === selectedTeam)?.name} Fan Room
                </h4>
              </div>
            </div>
            <button
              onClick={handleJoin}
              className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1"
            >
              Join Fan Room &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8 px-4 text-center text-[11px] text-textMuted/40">
        &copy; {new Date().getFullYear()} Chatjeen World Cup Fan Zone. 100% Anonymous.
      </footer>
    </div>
  );
}

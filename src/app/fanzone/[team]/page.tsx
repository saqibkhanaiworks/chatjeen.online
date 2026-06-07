/* eslint-disable */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, SendHorizontal, X, BarChart2, ShieldAlert } from "lucide-react";
import { countries, getMatchForTeam, isWorldCupActive, Country, getFlagUrl, getTeamTheme } from "../wcData";

interface Message {
  id: string;
  sender: "me" | "fan";
  nickname: string;
  avatarColor: string;
  text: string;
  timestamp: number;
  reactions: {
    "🔥": number;
    "⚡": number;
    "😤": number;
    "🏆": number;
    "💀": number;
  };
  userReaction?: "🔥" | "⚡" | "😤" | "🏆" | "💀";
}

interface Poll {
  question: string;
  options: string[];
  votes: number[];
  userVote?: number;
  totalVotes: number;
}

// Colored avatar backgrounds for anonymous fans
const AVATAR_COLORS = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", 
  "bg-pink-500", "bg-purple-500", "bg-indigo-500", "bg-teal-500", 
  "bg-orange-500", "bg-cyan-500"
];

// Fan names pool
const FAN_NICKNAMES = [
  "PitchKing", "VibeFc", "GoalGator", "NetRippa", "CornerKick", 
  "StoppageTime", "VAR_Official", "PitchPerfect", "Champs6", "TikiTaka",
  "NeymarJunior", "CruyffTurn", "FalseNine", "OffsideTrap", "CleanSheet",
  "HeaderHero", "RedCardRef", "SuperSub", "BootRoom", "Crossbar"
];

// Simulated fan messages
const FAN_MESSAGES_POOL = [
  "Let's gooooo! ⚽🏆",
  "We are actually playing so well today!",
  "Ref is absolutely blind, how is that not a card?",
  "My heart cannot take this match...",
  "What a clean save! GK is a beast today 🙌",
  "VAMOS!",
  "Who else is watching from work right now? 😂",
  "We need a substitution in midfield ASAP",
  "This is peak football right here",
  "If we score next, I am buying everyone a pizza 🍕",
  "TACTICS ARE SPOT ON TODAY!",
  "Never in doubt, let's keep the pressure on!",
  "That last run was class 👏",
  "Can we talk about that defense? Shaky...",
  "OMG how did he miss that wide open goal?! 😭",
  "World Cup is ours, mark my words!",
  "This group is so tough, every point counts.",
  "What a strike! That deserved to go in.",
  "Unbelievable atmosphere in the stadium, wish I was there!",
  "We are cooking! 🔥🍳"
];

const POLLS_POOL: Omit<Poll, "votes" | "totalVotes">[] = [
  {
    question: "Rate that last play 🔥",
    options: ["Insane! 🔥", "Decent 👍", "Meh 🥱", "Ref was blind! 🤬"]
  },
  {
    question: "Will our team score next?",
    options: ["Yes, definitely! ⚽", "No way 🙅‍♂️", "Only in extra time ⏳"]
  },
  {
    question: "Man of the match so far?",
    options: ["Striker 🏃‍♂️", "Goalkeeper 🧤", "Midfield Maestro 🪄", "The Coach 🧠"]
  }
];

export default function FanRoomPage() {
  const router = useRouter();
  const params = useParams();
  const teamSlug = params.team as string;

  const [team, setTeam] = useState<Country | null>(null);
  const [checkingActive, setCheckingActive] = useState(true);
  const [fanCount, setFanCount] = useState(120);
  const [matchInfo, setMatchInfo] = useState<ReturnType<typeof getMatchForTeam> | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Chat States
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Poll States
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [pollCountdown, setPollCountdown] = useState(60);
  const pollTimerRef = useRef<any>(null);

  // Goal Overlay States
  const [showGoal, setShowGoal] = useState(false);
  const [goalFanCelebrations, setGoalFanCelebrations] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiParticles = useRef<any[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Load and check team & date validity
  useEffect(() => {
    if (!isWorldCupActive()) {
      router.replace("/");
      return;
    }

    const matchedCountry = countries.find((c) => c.slug === teamSlug);
    if (!matchedCountry) {
      router.replace("/fanzone");
      return;
    }

    setTeam(matchedCountry);
    setCheckingActive(false);

    // Initial Fan Count (random 80 - 400)
    setFanCount(Math.floor(Math.random() * (400 - 80 + 1)) + 80);

    // Initial match calculation
    const currentMatch = getMatchForTeam(matchedCountry.slug);
    setMatchInfo(currentMatch);

    // Populate initial chat history
    const initialMsgs: Message[] = [];
    const now = Date.now();
    for (let i = 0; i < 8; i++) {
      const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      const nickname = `${FAN_NICKNAMES[Math.floor(Math.random() * FAN_NICKNAMES.length)]} #${Math.floor(100 + Math.random() * 900)}`;
      
      const theme = getTeamTheme(matchedCountry.slug);
      const useChant = Math.random() > 0.55 && theme.chants.length > 0;
      const text = useChant
        ? theme.chants[Math.floor(Math.random() * theme.chants.length)]
        : FAN_MESSAGES_POOL[Math.floor(Math.random() * FAN_MESSAGES_POOL.length)].replace("[TEAM]", matchedCountry.name);
      initialMsgs.push({
        id: `init-${i}`,
        sender: "fan",
        nickname,
        avatarColor,
        text,
        timestamp: now - (8 - i) * 60000,
        reactions: {
          "🔥": Math.floor(Math.random() * 12),
          "⚡": Math.floor(Math.random() * 8),
          "😤": Math.floor(Math.random() * 6),
          "🏆": Math.floor(Math.random() * 15),
          "💀": Math.floor(Math.random() * 5)
        }
      });
    }
    setMessages(initialMsgs);

    // Set up triggerGoal on window
    (window as any).triggerGoal = () => {
      setGoalFanCelebrations(Math.floor(Math.random() * 1500) + 120);
      setShowGoal(true);
    };

    return () => {
      delete (window as any).triggerGoal;
    };
  }, [teamSlug, router]);

  // Update Clock, Match Status & Fan Count
  useEffect(() => {
    if (checkingActive || !team) return;

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setMatchInfo(getMatchForTeam(team.slug, now));

      // Slowly tick fan count up/down (+/- 1 to 3)
      setFanCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + delta;
        return next < 80 ? 80 : next > 600 ? 600 : next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [checkingActive, team]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulated live chat feed (new comments every 4-8 seconds)
  useEffect(() => {
    if (checkingActive || !team || showGoal) return;

    const intervalTime = Math.floor(Math.random() * 4000) + 4000; // 4 to 8 seconds
    const chatSimulator = setInterval(() => {
      // Don't show simulated messages if user is looking at a goal or poll is taking full focus
      const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      const nickname = `${FAN_NICKNAMES[Math.floor(Math.random() * FAN_NICKNAMES.length)]} #${Math.floor(100 + Math.random() * 900)}`;
      
      const theme = getTeamTheme(team.slug);
      const useChant = Math.random() > 0.55 && theme.chants.length > 0;
      const text = useChant
        ? theme.chants[Math.floor(Math.random() * theme.chants.length)]
        : FAN_MESSAGES_POOL[Math.floor(Math.random() * FAN_MESSAGES_POOL.length)].replace("[TEAM]", team.name);

      const newMsg: Message = {
        id: `sim-${Date.now()}`,
        sender: "fan",
        nickname,
        avatarColor,
        text,
        timestamp: Date.now(),
        reactions: {
          "🔥": Math.random() > 0.4 ? Math.floor(Math.random() * 3) : 0,
          "⚡": Math.random() > 0.6 ? Math.floor(Math.random() * 2) : 0,
          "😤": Math.random() > 0.7 ? Math.floor(Math.random() * 2) : 0,
          "🏆": Math.random() > 0.5 ? Math.floor(Math.random() * 4) : 0,
          "💀": Math.random() > 0.8 ? Math.floor(Math.random() * 2) : 0
        }
      };

      setMessages((prev) => [...prev, newMsg]);

      // Occasionally add randomized reaction updates to existing messages to feel "alive"
      setMessages((prev) => {
        if (prev.length < 5) return prev;
        const updated = [...prev];
        const luckyIndex = Math.floor(Math.random() * (updated.length - 2));
        const keys: ("🔥" | "⚡" | "😤" | "🏆" | "💀")[] = ["🔥", "⚡", "😤", "🏆", "💀"];
        const key = keys[Math.floor(Math.random() * keys.length)];
        updated[luckyIndex] = {
          ...updated[luckyIndex],
          reactions: {
            ...updated[luckyIndex].reactions,
            [key]: updated[luckyIndex].reactions[key] + 1
          }
        };
        return updated;
      });
    }, intervalTime);

    return () => clearInterval(chatSimulator);
  }, [checkingActive, team, showGoal]);

  // Live Poll Trigger (triggers after 15 seconds, and then repeats every 15 minutes)
  useEffect(() => {
    if (checkingActive || !team) return;

    const triggerNewPoll = () => {
      // Pick a random poll questions from pool
      const template = POLLS_POOL[Math.floor(Math.random() * POLLS_POOL.length)];
      const formattedQuestion = template.question.replace("[team]", team.name);
      
      // Starting simulated votes (e.g. 50-200 votes total)
      const numOptions = template.options.length;
      const initialVotes = Array.from({ length: numOptions }, () => Math.floor(Math.random() * 45) + 10);
      const totalVotes = initialVotes.reduce((a, b) => a + b, 0);

      setActivePoll({
        question: formattedQuestion,
        options: template.options,
        votes: initialVotes,
        totalVotes
      });
      setPollCountdown(60);
    };

    // Trigger first poll after 15 seconds of joining
    const initialPollTimeout = setTimeout(triggerNewPoll, 15000);

    // Repeat poll every 15 minutes
    const pollInterval = setInterval(triggerNewPoll, 15 * 60 * 1000);

    return () => {
      clearTimeout(initialPollTimeout);
      clearInterval(pollInterval);
    };
  }, [checkingActive, team]);

  // Poll Countdown timer
  useEffect(() => {
    if (!activePoll) return;

    pollTimerRef.current = setInterval(() => {
      setPollCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(pollTimerRef.current);
          setActivePoll(null);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(pollTimerRef.current);
  }, [activePoll]);

  // Confetti Particle Engine (HTML5 Canvas)
  useEffect(() => {
    if (!showGoal || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate confetti particles
    const colors = ["#F59E0B", "#7C3AED", "#EC4899", "#10B981", "#3B82F6", "#EF4444", "#FBBF24"];
    const particles: any[] = [];
    const count = 180;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        vy: Math.random() * 3 + 4,
        vx: Math.random() * 2 - 1
      });
    }
    confettiParticles.current = particles;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.tiltAngle) * 0.5;
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

        // Reset particle if it falls off screen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Auto dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      setShowGoal(false);
    }, 5000);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(dismissTimer);
    };
  }, [showGoal]);

  if (checkingActive || !team || !matchInfo) {
    return (
      <div className="bg-background text-textPrimary h-screen flex flex-col items-center justify-center bg-grain">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-textMuted font-medium tracking-wide">Connecting to Room...</p>
        </div>
      </div>
    );
  }

  // Safety checks
  const checkSafety = (text: string): { safe: boolean; warning?: string } => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const socialRegex = /\b(snapchat|snap|instagram|insta|ig|discord|disc|twitter|telegram|tg|facebook|fb|tiktok)\b[:\s\-]*[a-zA-Z0-9_.]+|\B@\w+/i;
    
    if (emailRegex.test(text) || phoneRegex.test(text) || socialRegex.test(text)) {
      return {
        safe: false,
        warning: "🛡️ Help keep the Fan Zone safe! Please do not share personal contacts or social media links."
      };
    }
    return { safe: true };
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const safety = checkSafety(inputText);
    if (!safety.safe) {
      setWarningMsg(safety.warning || "");
      setTimeout(() => setWarningMsg(""), 5000);
      return;
    }

    const newMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "me",
      nickname: "You (Fan)",
      avatarColor: "bg-primary",
      text: inputText.trim(),
      timestamp: Date.now(),
      reactions: { "🔥": 0, "⚡": 0, "😤": 0, "🏆": 0, "💀": 0 }
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setWarningMsg("");

    // Simulate other fans reacting to user message
    setTimeout(() => {
      setMessages((prev) => {
        const index = prev.findIndex((m) => m.id === newMsg.id);
        if (index === -1) return prev;
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          reactions: {
            ...updated[index].reactions,
            "🔥": Math.floor(Math.random() * 4) + 1,
            "🏆": Math.random() > 0.5 ? 1 : 0
          }
        };
        return updated;
      });
    }, 1500);
  };

  // Reaction handler
  const handleReact = (msgId: string, emoji: "🔥" | "⚡" | "😤" | "🏆" | "💀") => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;

        const updatedReactions = { ...msg.reactions };
        let userReaction = msg.userReaction;

        // If clicking same reaction, undo it.
        if (msg.userReaction === emoji) {
          updatedReactions[emoji] = Math.max(0, updatedReactions[emoji] - 1);
          userReaction = undefined;
        } else {
          // If had another reaction, decrement it first
          if (msg.userReaction) {
            updatedReactions[msg.userReaction] = Math.max(0, updatedReactions[msg.userReaction] - 1);
          }
          updatedReactions[emoji] = updatedReactions[emoji] + 1;
          userReaction = emoji;
        }

        return {
          ...msg,
          reactions: updatedReactions,
          userReaction
        };
      })
    );
  };

  // Poll Vote Handler
  const handleVote = (optionIndex: number) => {
    if (!activePoll || activePoll.userVote !== undefined) return;

    setActivePoll((prev) => {
      if (!prev) return null;
      const updatedVotes = [...prev.votes];
      updatedVotes[optionIndex] += 1;
      return {
        ...prev,
        votes: updatedVotes,
        userVote: optionIndex,
        totalVotes: prev.totalVotes + 1
      };
    });

    // Simulate other votes ticking in slightly after
    setTimeout(() => {
      setActivePoll((prev) => {
        if (!prev) return null;
        const updatedVotes = prev.votes.map((v) => v + (Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0));
        return {
          ...prev,
          votes: updatedVotes,
          totalVotes: updatedVotes.reduce((a, b) => a + b, 0)
        };
      });
    }, 800);
  };

  // Match Information Calculations
  const isMatchLive = matchInfo.status === "live";
  const isMatchUpcoming = matchInfo.status === "upcoming";
  const showRivalRoom = isMatchLive || isMatchUpcoming;

  // Find opponent country details
  const opponent = matchInfo.homeTeam.slug === team.slug ? matchInfo.awayTeam : matchInfo.homeTeam;

  const formatCountdown = (kickoffTime: Date) => {
    const diffMs = kickoffTime.getTime() - currentTime.getTime();
    if (diffMs <= 0) return "Live Now";
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `Kickoff in ${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-background text-textPrimary h-screen flex flex-col justify-between relative overflow-hidden bg-grain select-none">
      {/* Background Stadium Overlay & Team Colors Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Stadium Image Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: "url('/fanzone_bg.png')" }}
        />
        {/* Pitch Green Grass Vibe Texture */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-950/10 to-transparent opacity-30" />
        {/* Team-Specific Gradient Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTeamTheme(team.slug).gradient} opacity-50`} />
        {/* Ambient radial lighting glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25"
          style={{ backgroundColor: getTeamTheme(team.slug).glow }}
        />
      </div>

      {/* CSS Styling Injection for Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .text-gold-shine {
          background: linear-gradient(90deg, #F59E0B 25%, #FFFBEB 50%, #F59E0B 75%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }
        @keyframes pop-react {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .pop-reaction {
          animation: pop-react 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}} />

      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur border-b border-border py-3 px-4 shadow-[0_2px_15px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/fanzone"
              className="p-1.5 rounded-full hover:bg-surface2 transition-colors mr-1 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-textMuted hover:text-white" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-6 overflow-hidden rounded border border-border/40 bg-surface2 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src={getFlagUrl(team.code)}
                  alt={team.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h1 className="text-sm font-bold text-white leading-tight">
                  {team.name} Fan Room
                </h1>
                <div className="flex items-center gap-1.5 text-[11px] text-textMuted">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>{fanCount} fans active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Match Badges & Rival Room Button */}
          <div className="flex items-center gap-3">
            {/* Match Status Badge */}
            {isMatchLive && (
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                ⚽ {matchInfo.homeTeam.code} vs {matchInfo.awayTeam.code} · Live
              </span>
            )}
            {!isMatchLive && isMatchUpcoming && (
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                ⏳ {formatCountdown(matchInfo.kickoffTime)}
              </span>
            )}

            {/* Visit Rival Room */}
            {showRivalRoom && (
              <Link
                href={`/fanzone/${opponent.slug}`}
                className="bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 uppercase tracking-wider cursor-pointer"
              >
                ⚔️ Rival Room
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 pt-20 pb-36 max-w-3xl mx-auto w-full space-y-4 no-scrollbar relative z-10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"} animate-bubble-pop`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-inner ${msg.avatarColor}`}>
              {msg.nickname.slice(0, 2).toUpperCase()}
            </div>

            {/* Message Info + Bubble */}
            <div className={`flex flex-col space-y-1 max-w-[80%] ${msg.sender === "me" ? "items-end" : "items-start"}`}>
              {/* Nickname & Time */}
              <div className="flex items-center gap-1.5 text-[10px] text-textMuted px-1">
                <span className="font-bold">{msg.nickname}</span>
                <span>&middot;</span>
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Chat Bubble */}
              <div
                className={`p-3 rounded-card text-[13px] leading-relaxed shadow-sm ${
                  msg.sender === "me"
                    ? "bg-primary text-white rounded-tr-none font-medium"
                    : "bg-surface border border-border text-textPrimary rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>

              {/* Emoji Reaction Row */}
              <div className="flex flex-wrap gap-1 pt-1.5">
                {(["🔥", "⚡", "😤", "🏆", "💀"] as const).map((emoji) => {
                  const count = msg.reactions[emoji];
                  const hasReacted = msg.userReaction === emoji;
                  if (count === 0 && !hasReacted) return null;
                  return (
                    <button
                      key={emoji}
                      onClick={() => handleReact(msg.id, emoji)}
                      className={`px-2 py-0.5 rounded-full border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                        hasReacted
                          ? "bg-primary/20 border-primary text-primary pop-reaction"
                          : "bg-surface2/60 border-border text-textMuted hover:text-white hover:border-textMuted"
                      }`}
                    >
                      <span>{emoji}</span>
                      <span className="text-[10px]">{count}</span>
                    </button>
                  );
                })}

                {/* React trigger button for strangers' messages */}
                {msg.sender === "fan" && !msg.userReaction && (
                  <div className="flex items-center gap-0.5 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-150 pl-1">
                    {(["🔥", "🏆", "💀"] as const).map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReact(msg.id, emoji)}
                        className="text-xs filter hover:scale-125 transition-transform duration-100 cursor-pointer p-0.5"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      {/* Bottom Sticky Input + Poll Overlay Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-background/90 backdrop-blur border-t border-border py-4 px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.4)]">
        <div className="max-w-2xl mx-auto space-y-3 relative">
          
          {/* Warning badge */}
          {warningMsg && (
            <div className="bg-danger/10 border border-danger/30 text-danger rounded-default p-3 text-xs font-semibold flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-4 h-4 text-danger shrink-0" />
              <span>{warningMsg}</span>
            </div>
          )}

          {/* Poll Card */}
          {activePoll && (
            <div className="bg-surface border border-border rounded-default p-4 shadow-lg animate-slide-up relative overflow-hidden space-y-3.5">
              {/* Poll timer progress bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-surface2">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-linear"
                  style={{ width: `${(pollCountdown / 60) * 100}%` }}
                />
              </div>

              {/* Poll header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-accent font-bold text-xs uppercase tracking-wider">
                  <BarChart2 className="w-4 h-4 text-accent" />
                  <span>Match Poll ({pollCountdown}s)</span>
                </div>
                <button 
                  onClick={() => setActivePoll(null)}
                  className="p-1 rounded-full hover:bg-surface2 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-textMuted hover:text-white" />
                </button>
              </div>

              {/* Poll question */}
              <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
                {activePoll.question}
              </h4>

              {/* Poll Options Grid */}
              <div className="space-y-2">
                {activePoll.options.map((opt, i) => {
                  const voteCount = activePoll.votes[i] || 0;
                  const percent = activePoll.totalVotes > 0 
                    ? Math.round((voteCount / activePoll.totalVotes) * 100) 
                    : 0;
                  const isUserSelection = activePoll.userVote === i;
                  const hasVoted = activePoll.userVote !== undefined;

                  return (
                    <button
                      key={i}
                      disabled={hasVoted}
                      onClick={() => handleVote(i)}
                      className={`w-full text-left p-3.5 rounded-default border text-xs font-semibold relative overflow-hidden transition-all duration-200 flex items-center justify-between select-none ${
                        hasVoted ? "cursor-default" : "cursor-pointer hover:bg-surface2 hover:border-textMuted active:scale-[0.99]"
                      } ${
                        isUserSelection
                          ? "border-primary bg-primary/10 text-white font-bold"
                          : "border-border bg-surface2/40 text-textPrimary"
                      }`}
                    >
                      {/* Percent Fill Background */}
                      {hasVoted && (
                        <div 
                          className={`absolute top-0 left-0 bottom-0 z-0 transition-all duration-700 ${
                            isUserSelection ? "bg-primary/20" : "bg-border/30"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-1.5">
                        {opt}
                        {isUserSelection && <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">Voted</span>}
                      </span>

                      {hasVoted && (
                        <span className="relative z-10 font-bold text-white text-[11px]">
                          {percent}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Text Input Row */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, 100))}
              placeholder="Say something to your fellow fans..."
              className="flex-1 py-3 px-5 rounded-full bg-surface border border-border focus:border-primary text-sm text-textPrimary placeholder-[#52525B] focus:outline-none focus:ring-3 focus:ring-primary/15 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-3.5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                inputText.trim()
                  ? "bg-primary text-white cursor-pointer hover:bg-primary/95 active:scale-[0.95]"
                  : "bg-surface border border-border text-textMuted/40 cursor-not-allowed"
              }`}
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>
      </footer>

      {/* Goal Celebration Full-Screen Overlay */}
      {showGoal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-auto transition-opacity duration-300">
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
          
          <div className="z-20 text-center space-y-4 max-w-md px-6 py-8 bg-surface/30 border border-white/5 rounded-card shadow-2xl animate-scale-up">
            <div className="w-24 h-16 mx-auto overflow-hidden rounded-default border border-white/20 bg-surface2 flex items-center justify-center shadow-lg animate-bounce duration-500">
              <img
                src={getFlagUrl(team.code)}
                alt={team.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-5xl font-extrabold tracking-wider uppercase text-gold-shine">
              GOOOAL!
            </h2>
            <div className="text-white font-bold text-xl uppercase tracking-wide">
              {team.name} Scores!
            </div>
            <p className="text-textMuted text-xs font-semibold tracking-wider">
              🎉 {goalFanCelebrations.toLocaleString()} fans celebrating live in this room!
            </p>
            <button
              onClick={() => setShowGoal(false)}
              className="mt-6 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Dev test floating button (Development mode only) */}
      {(typeof window !== "undefined" && (window.location.search.includes("wcTest=true") || process.env.NODE_ENV === "development")) && (
        <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2">
          <button
            onClick={() => (window as any).triggerGoal?.()}
            className="bg-accent hover:bg-accent/90 text-background font-extrabold text-[10px] px-3 py-2 rounded-full flex items-center gap-1 shadow-md shadow-accent/20 uppercase tracking-wider cursor-pointer"
          >
            🎉 Test Goal
          </button>
          {activePoll ? (
            <button
              onClick={() => setActivePoll(null)}
              className="bg-surface border border-border hover:bg-surface2 text-textMuted hover:text-white font-bold text-[10px] px-3 py-2 rounded-full flex items-center justify-center shadow-md uppercase tracking-wider cursor-pointer"
            >
              ❌ Hide Poll
            </button>
          ) : (
            <button
              onClick={() => {
                const template = POLLS_POOL[Math.floor(Math.random() * POLLS_POOL.length)];
                const formattedQuestion = template.question.replace("[team]", team.name);
                const initialVotes = template.options.map(() => Math.floor(Math.random() * 45) + 10);
                setActivePoll({
                  question: formattedQuestion,
                  options: template.options,
                  votes: initialVotes,
                  totalVotes: initialVotes.reduce((a, b) => a + b, 0)
                });
                setPollCountdown(60);
              }}
              className="bg-surface border border-border hover:bg-surface2 text-textMuted hover:text-white font-bold text-[10px] px-3 py-2 rounded-full flex items-center justify-center shadow-md uppercase tracking-wider cursor-pointer"
            >
              📊 Test Poll
            </button>
          )}
        </div>
      )}
    </div>
  );
}

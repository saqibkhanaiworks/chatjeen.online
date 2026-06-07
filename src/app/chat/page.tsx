"use client";

/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { io } from "socket.io-client";
import dynamic from "next/dynamic";
import { 
  MessageCircle, 
  Flag, 
  X, 
  Bot, 
  Smile, 
  SendHorizontal, 
  Lock, 
  Loader2,
  ArrowLeft
} from "lucide-react";

// Dynamically import EmojiPicker to prevent SSR hydration mismatches in Next.js App Router
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const INTEREST_TAGS = [
  { label: "🎵 Music Match", val: "music" },
  { label: "🎮 Gamer Talk", val: "gaming" },
  { label: "🌍 Culture Swap", val: "travel" },
  { label: "😂 Just Vibes", val: "memes" },
  { label: "🤔 Deep Talk", val: "philosophy" },
  { label: "🎬 Movies", val: "movies" },
  { label: "⚽ Sports", val: "sports" },
  { label: "💻 Tech", val: "tech" },
  { label: "🎨 Art", val: "art" },
  { label: "🍕 Food", val: "food" },
  { label: "🌙 2AM Mode", val: "2am" }
];

const MATCHING_TEXTS = [
  "Finding someone interesting...",
  "Scanning the vibe...",
  "AI is working its magic...",
  "Almost there..."
];

const MAP_HINTS = [
  "Searching... 🌍 1,420 people online right now",
  "Looking in Europe, Asia, Americas...",
  "Found 3 potential matches...",
  "Connecting...",
  "Scanning active vibe tags...",
  "Filtering bad actors..."
];

export default function ChatPage() {
  const [step, setStep] = useState<"tags" | "matching" | "chat" | "reflection" | "disconnected">("tags");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [country, setCountry] = useState("US");
  const [matchingTextIndex, setMatchingTextIndex] = useState(0);
  const [mapHintIndex, setMapHintIndex] = useState(0);

  // Active Chat State
  const [messages, setMessages] = useState<{ id: string; sender: "me" | "stranger" | "system"; text: string; timestamp: number }[]>([]);
  const [inputText, setInputText] = useState("");
  const [partnerCountry, setPartnerCountry] = useState("");
  const [partnerInterests, setPartnerInterests] = useState<string[]>([]);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  // Custom Nicknames
  const [nickname, setNickname] = useState("Stranger");
  const [partnerNickname, setPartnerNickname] = useState("Stranger");
  const [activeMood, setActiveMood] = useState<string | null>(null);

  // AI Icebreaker state
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [icebreakerOpen, setIcebreakerOpen] = useState(false);
  const [icebreakersLoading, setIcebreakersLoading] = useState(false);
  const [selectedChipIndex, setSelectedChipIndex] = useState<number | null>(null);

  // Starter Games state
  const [gameLoading, setGameLoading] = useState<string | null>(null);

  // Post-Chat Reflection state
  const [reflectionData, setReflectionData] = useState<{
    messageCount: number;
    country: string;
    wasSkippedByPartner: boolean;
  } | null>(null);
  const [disconnectHeadline, setDisconnectHeadline] = useState("That was a good one. 👋");

  // UI state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [chatDuration, setChatDuration] = useState(0);

  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<any>(null);
  const isTypingEmitRef = useRef(false);
  const reflectionTimerRef = useRef<any>(null);

  // Get user country flag on mount
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) setCountry(data.country_code);
      })
      .catch(() => {});
  }, []);

  // Load saved nickname and parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get("name");
      const savedName = localStorage.getItem("chatjeen_nickname");
      const moodParam = params.get("mood");
      if (nameParam) {
        setNickname(nameParam);
      } else if (savedName) {
        setNickname(savedName);
      }
      if (moodParam) {
        setActiveMood(moodParam);
      }
    }
  }, []);

  // Sync active mood theme with selected tags
  useEffect(() => {
    if (selectedTags.length > 0) {
      setActiveMood(selectedTags[0]);
    } else {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const moodParam = params.get("mood");
        if (moodParam && selectedTags.length === 0) {
          setActiveMood(moodParam);
        } else {
          setActiveMood(null);
        }
      }
    }
  }, [selectedTags]);

  // Vibe tag initialization from query parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const mood = params.get("mood");
      const nameParam = params.get("name");
      if (nameParam) {
        setNickname(nameParam);
      }
      if (mood) {
        const tagExists = INTEREST_TAGS.some((t) => t.val === mood);
        if (tagExists) {
          setSelectedTags([mood]);
          setStep("matching");
          setTimeout(() => {
            const activeName = nameParam || localStorage.getItem("chatjeen_nickname") || "Stranger";
            connectSocket([mood], activeName);
          }, 350);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  // Cycle matching texts
  useEffect(() => {
    if (step !== "matching") return;
    const interval = setInterval(() => {
      setMatchingTextIndex((prev) => (prev + 1) % MATCHING_TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [step]);

  // Cycle live map queue hints
  useEffect(() => {
    if (step !== "matching") return;
    const interval = setInterval(() => {
      setMapHintIndex((prev) => (prev + 1) % MAP_HINTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [step]);

  // Scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPartnerTyping]);

  // Chat session timer
  useEffect(() => {
    if (step !== "chat") {
      setChatDuration(0);
      return;
    }

    const interval = setInterval(() => {
      setChatDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Clean up timers & socket on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (reflectionTimerRef.current) {
        clearTimeout(reflectionTimerRef.current);
      }
    };
  }, []);

  // Connect to Socket.io backend
  const connectSocket = (tagsToUse: string[] = selectedTags, nameToUse: string = nickname) => {
    const backendUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
    console.log("🔌 Connecting to backend socket:", backendUrl);
    
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(backendUrl);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("start_matching", {
        interests: tagsToUse,
        country: country,
        nickname: nameToUse
      });
    });

    socketRef.current.on("match_found", (data: any) => {
      setPartnerCountry(data.partnerCountry);
      setPartnerNickname(data.partnerNickname || "Stranger");
      setPartnerInterests(data.sharedInterests || []);
      setMessages([]);
      setSelectedChipIndex(null);
      setWarningMsg("");
      setShowEmojiPicker(false);
      setStep("chat");
      
      // Fetch AI Icebreakers
      fetchIcebreakers(data.sharedInterests, tagsToUse);
    });

    socketRef.current.on("message", (msg: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          sender: "stranger",
          text: msg.text,
          timestamp: msg.timestamp
        }
      ]);
    });

    socketRef.current.on("typing", (data: any) => {
      setIsPartnerTyping(data.isTyping);
    });

    socketRef.current.on("partner_left", () => {
      handlePartnerLeft();
    });
  };

  // Fetch AI suggested openers
  const fetchIcebreakers = async (sharedTags: string[], tagsToUse: string[]) => {
    setIcebreakersLoading(true);
    setIcebreakerOpen(true);
    try {
      const tagsToSend = sharedTags.length > 0 ? sharedTags : (tagsToUse.length > 0 ? tagsToUse : ["memes", "music"]);
      const res = await fetch("/api/icebreakers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: tagsToSend })
      });
      const data = await res.json();
      if (data.icebreakers && data.icebreakers.length > 0) {
        setIcebreakers(data.icebreakers);
      }
    } catch (err) {
      console.error("Failed to load icebreakers:", err);
    } finally {
      setIcebreakersLoading(false);
    }
  };

  // Toggle interest tags
  const handleTagToggle = (val: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(val)) {
        return prev.filter((t) => t !== val);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, val];
    });
  };

  const handleSkipAndMatchRandom = () => {
    setSelectedTags([]);
    setStep("matching");
    connectSocket([]);
  };

  const handleFindMatch = () => {
    setStep("matching");
    connectSocket();
  };

  const checkSafety = (text: string): { safe: boolean; warning?: string } => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const socialRegex = /\b(snapchat|snap|instagram|insta|ig|discord|disc|twitter|telegram|tg|facebook|fb|tiktok)\b[:\s\-]*[a-zA-Z0-9_.]+|\B@\w+/i;
    
    if (emailRegex.test(text) || phoneRegex.test(text) || socialRegex.test(text)) {
      return {
        safe: false,
        warning: "🛡️ Keep it anonymous — sharing personal info removes the magic"
      };
    }
    return { safe: true };
  };

  const moderateMessageAI = async (text: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      return data.status === "SAFE";
    } catch {
      return true;
    }
  };

  // Adjust textarea height automatically (Max 120px)
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  // Send message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const messageToSend = inputText;
    setInputText("");
    setWarningMsg("");
    setShowEmojiPicker(false);
    setSelectedChipIndex(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const safetyCheck = checkSafety(messageToSend);
    if (!safetyCheck.safe) {
      setWarningMsg(safetyCheck.warning || "");
      return;
    }

    if (socketRef.current) {
      socketRef.current.emit("typing", { isTyping: false });
      isTypingEmitRef.current = false;
    }

    const isSafe = await moderateMessageAI(messageToSend);
    if (!isSafe) {
      setWarningMsg("🛡️ That message was flagged by AI. Keep it respectful.");
      return;
    }

    if (socketRef.current) {
      socketRef.current.emit("send_message", { text: messageToSend });
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          sender: "me",
          text: messageToSend,
          timestamp: Date.now()
        }
      ]);
      setIcebreakerOpen(false); // Dismiss icebreaker panel after first message is sent
    }
  };

  // Textarea typing handler
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    adjustHeight();

    if (!socketRef.current) return;

    if (!isTypingEmitRef.current) {
      socketRef.current.emit("typing", { isTyping: true });
      isTypingEmitRef.current = true;
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing", { isTyping: false });
      isTypingEmitRef.current = false;
    }, 2000);
  };

  // Skip partner (Triggers reflection first)
  const handleSkipPartner = () => {
    setIsSkipping(true);
    
    if (socketRef.current) {
      socketRef.current.emit("skip");
      socketRef.current.disconnect();
    }

    const count = messages.filter((m) => m.sender !== "system").length;
    setReflectionData({
      messageCount: count,
      country: partnerCountry || "unknown",
      wasSkippedByPartner: false
    });

    setStep("reflection");

    // Randomize disconnect headline
    const headlines = [
      "That was a good one. 👋",
      "Every stranger was a story. 📖",
      "Gone, but the conversation happened. ✨",
      "The internet is full of interesting people. 🌍"
    ];
    setDisconnectHeadline(headlines[Math.floor(Math.random() * headlines.length)]);

    reflectionTimerRef.current = setTimeout(() => {
      setStep("disconnected");
      setIsSkipping(false);
    }, 2500);
  };

  // Report partner
  const handleReportPartner = () => {
    if (socketRef.current) {
      socketRef.current.emit("report");
      socketRef.current.disconnect();
    }
    
    setStep("matching");
    setMessages([]);
    setIsPartnerTyping(false);
    setIcebreakers([]);
    setWarningMsg("");
    setShowEmojiPicker(false);
    setSelectedChipIndex(null);
    connectSocket();
  };

  // Partner left chat logic
  const handlePartnerLeft = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const count = messages.filter((m) => m.sender !== "system").length;
    setReflectionData({
      messageCount: count,
      country: partnerCountry || "unknown",
      wasSkippedByPartner: true
    });

    setStep("reflection");

    const headlines = [
      "That was a good one. 👋",
      "Every stranger was a story. 📖",
      "Gone, but the conversation happened. ✨",
      "The internet is full of interesting people. 🌍"
    ];
    setDisconnectHeadline(headlines[Math.floor(Math.random() * headlines.length)]);

    reflectionTimerRef.current = setTimeout(() => {
      setStep("disconnected");
    }, 2500);
  };

  // Instantly start new match (skips reflection screen timer)
  const handleFindMatchAfterReflection = () => {
    if (reflectionTimerRef.current) {
      clearTimeout(reflectionTimerRef.current);
    }
    setStep("matching");
    setMessages([]);
    setIsPartnerTyping(false);
    setIcebreakers([]);
    setWarningMsg("");
    setShowEmojiPicker(false);
    setSelectedChipIndex(null);
    connectSocket();
  };

  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode || countryCode === "unknown") return "🌍";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const handleRegenerateIcebreakers = () => {
    fetchIcebreakers(partnerInterests, selectedTags);
  };

  const handleEmojiSelect = (emojiData: any) => {
    setInputText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    setTimeout(() => adjustHeight(), 50);
  };

  // Play conversation games (Phase 2)
  const handlePlayGame = async (gameType: string) => {
    if (gameLoading) return;
    setGameLoading(gameType);
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameType })
      });
      const data = await res.json();
      if (data.question) {
        const gameTitles: Record<string, string> = {
          would_you_rather: "Would You Rather",
          hot_takes: "Hot Take",
          two_truths_one_lie: "2 Truths & 1 Lie",
          ama: "AMA"
        };
        const title = gameTitles[gameType] || "Game";
        const textToSend = `🎲 [${title}] ${data.question}`;

        if (socketRef.current) {
          socketRef.current.emit("send_message", { text: textToSend });
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              sender: "me",
              text: textToSend,
              timestamp: Date.now()
            }
          ]);
        }
      }
    } catch (err) {
      console.error("Failed to load game question:", err);
    } finally {
      setGameLoading(null);
    }
  };

  // Helper to calculate conversation streak (excluding system messages)
  const chatMessagesCount = messages.filter((m) => m.sender !== "system").length;

  const getStreakBadge = () => {
    if (chatMessagesCount >= 50) {
      return (
        <span className="bg-primary/25 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1 animate-pulse">
          🔥🔥🔥 {chatMessagesCount} messages — legendary
        </span>
      );
    }
    if (chatMessagesCount >= 25) {
      return (
        <span className="bg-primary/20 text-orange-400 border border-orange-500/30 text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1">
          🔥🔥 {chatMessagesCount} messages — rare conversation
        </span>
      );
    }
    if (chatMessagesCount >= 10) {
      return (
        <span className="bg-primary/10 text-primary-soft border border-primary/20 text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1">
          🔥 {chatMessagesCount} messages — this is a good one
        </span>
      );
    }
    return null;
  };

  const renderMoodBackground = (mood: string | null) => {
    if (mood === "music") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Waves */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
            <svg className="w-full h-1/2" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 200 C360 100, 720 300, 1080 100 C1260 0, 1440 200, 1440 200" stroke="#7C3AED" strokeWidth="4" className="animate-pulse" style={{ animationDuration: '6s' }} />
              <path d="M0 200 C360 300, 720 100, 1080 300 C1260 400, 1440 200, 1440 200" stroke="#7C3AED" strokeWidth="3" className="animate-pulse" style={{ animationDuration: '4s' }} />
            </svg>
          </div>
          {/* Floating Notes */}
          <div className="absolute bottom-[-20px] left-[10%] text-5xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '10s', animationDelay: '0s' }}>🎵</div>
          <div className="absolute bottom-[-20px] left-[35%] text-4xl text-primary opacity-[0.03] animate-float-up" style={{ animationDuration: '14s', animationDelay: '2s' }}>🎶</div>
          <div className="absolute bottom-[-20px] right-[25%] text-5xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '12s', animationDelay: '4s' }}>🎼</div>
          <div className="absolute bottom-[-20px] right-[8%] text-3xl text-primary opacity-[0.03] animate-float-up" style={{ animationDuration: '16s', animationDelay: '7s' }}>🎵</div>
        </div>
      );
    }

    if (mood === "gaming") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          <div className="absolute inset-0 opacity-[0.06] bg-gaming-grid-scroll" />
          <div className="absolute bottom-[-20px] left-[15%] text-5xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '12s', animationDelay: '1s' }}>👾</div>
          <div className="absolute bottom-[-20px] left-[45%] text-3xl text-primary opacity-[0.03] animate-float-up" style={{ animationDuration: '15s', animationDelay: '5s' }}>▲</div>
          <div className="absolute bottom-[-20px] right-[30%] text-4xl text-primary opacity-[0.03] animate-float-up" style={{ animationDuration: '10s', animationDelay: '3s' }}>●</div>
          <div className="absolute bottom-[-20px] right-[10%] text-5xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '14s', animationDelay: '7s' }}>🎮</div>
        </div>
      );
    }

    if (mood === "travel") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none flex items-center justify-center">
          <div className="absolute opacity-[0.03] animate-rotate-slow flex items-center justify-center">
            <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200" stroke="#7C3AED" strokeWidth="0.8" fill="none">
              <circle cx="100" cy="100" r="80" />
              <ellipse cx="100" cy="100" rx="80" ry="30" />
              <ellipse cx="100" cy="100" rx="80" ry="10" />
              <ellipse cx="100" cy="100" rx="30" ry="80" />
              <ellipse cx="100" cy="100" rx="10" ry="80" />
              <line x1="20" y1="100" x2="180" y2="100" />
              <line x1="100" y1="20" x2="100" y2="180" />
            </svg>
          </div>
          <div className="absolute bottom-[-20px] left-[8%] text-4xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '14s', animationDelay: '0s' }}>✈️</div>
          <div className="absolute bottom-[-20px] left-[50%] text-4xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '18s', animationDelay: '6s' }}>🧭</div>
          <div className="absolute bottom-[-20px] right-[15%] text-4xl text-primary opacity-[0.03] animate-float-up" style={{ animationDuration: '11s', animationDelay: '3s' }}>🌍</div>
        </div>
      );
    }

    if (mood === "memes") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          <div className="absolute bottom-[-20px] left-[10%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '9s', animationDelay: '0s' }}>😂</div>
          <div className="absolute bottom-[-20px] left-[30%] text-5xl opacity-[0.03] animate-float-up" style={{ animationDuration: '13s', animationDelay: '3s' }}>🤪</div>
          <div className="absolute bottom-[-20px] left-[55%] text-4xl opacity-[0.04] animate-float-up" style={{ animationDuration: '11s', animationDelay: '6s' }}>✨</div>
          <div className="absolute bottom-[-20px] right-[25%] text-5xl opacity-[0.03] animate-float-up" style={{ animationDuration: '15s', animationDelay: '1.5s' }}>👾</div>
          <div className="absolute bottom-[-20px] right-[8%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '10s', animationDelay: '4.5s' }}>🐱</div>
        </div>
      );
    }

    if (mood === "philosophy") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none flex items-center justify-center">
          <div className="absolute w-[800px] h-[800px] opacity-[0.04] animate-rotate-slow" style={{ animationDuration: '240s' }}>
            <svg viewBox="0 0 200 200" fill="#7C3AED" className="w-full h-full">
              <circle cx="30" cy="40" r="1.5" className="animate-pulse" style={{ animationDuration: '3s' }} />
              <circle cx="80" cy="20" r="1.0" className="animate-pulse" style={{ animationDuration: '4s' }} />
              <circle cx="150" cy="60" r="2.0" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
              <circle cx="120" cy="140" r="1.2" className="animate-pulse" style={{ animationDuration: '5s' }} />
              <circle cx="50" cy="160" r="1.8" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
              <circle cx="170" cy="170" r="1.0" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
              <line x1="30" y1="40" x2="80" y2="20" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="0.5" />
              <line x1="80" y1="20" x2="150" y2="60" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="0.5" />
              <line x1="120" y1="140" x2="170" y2="170" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="0.5" />
              <line x1="50" y1="160" x2="120" y2="140" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="0.5" />
              <line x1="80" y1="20" x2="120" y2="140" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="0.3" />
              <line x1="30" y1="40" x2="50" y2="160" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="0.3" />
            </svg>
          </div>
          <div className="absolute bottom-[-20px] left-[20%] text-4xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '16s', animationDelay: '2s' }}>🤔</div>
          <div className="absolute bottom-[-20px] right-[20%] text-4xl text-primary opacity-[0.04] animate-float-up" style={{ animationDuration: '14s', animationDelay: '5s' }}>💭</div>
        </div>
      );
    }

    if (mood === "movies") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Spotlight Sweep */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-xl animate-spotlight-sweep opacity-[0.35]" />
          {/* Film Reels/Strip emojis floating */}
          <div className="absolute bottom-[-20px] left-[12%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '11s', animationDelay: '0s' }}>🎬</div>
          <div className="absolute bottom-[-20px] left-[40%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '14s', animationDelay: '4s' }}>🍿</div>
          <div className="absolute bottom-[-20px] right-[25%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '12s', animationDelay: '2s' }}>🎞️</div>
          <div className="absolute bottom-[-20px] right-[8%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '15s', animationDelay: '6s' }}>🎥</div>
        </div>
      );
    }

    if (mood === "sports") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Field lines simulation */}
          <div className="absolute inset-x-6 top-12 bottom-24 border border-primary/5 rounded-[30px] flex items-center justify-center opacity-60">
            <div className="w-1/2 h-full border-r border-primary/5" />
            <div className="absolute w-40 h-40 border border-primary/5 rounded-full" />
            <div className="absolute w-8 h-8 bg-primary/5 rounded-full" />
          </div>
          {/* Floating Balls */}
          <div className="absolute bottom-[-20px] left-[10%] text-4xl opacity-[0.04] animate-float-up" style={{ animationDuration: '13s', animationDelay: '1s' }}>⚽</div>
          <div className="absolute bottom-[-20px] left-[45%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '16s', animationDelay: '5s' }}>🏀</div>
          <div className="absolute bottom-[-20px] right-[30%] text-4xl opacity-[0.04] animate-float-up" style={{ animationDuration: '11s', animationDelay: '3s' }}>🏈</div>
          <div className="absolute bottom-[-20px] right-[10%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '15s', animationDelay: '7s' }}>🎾</div>
        </div>
      );
    }

    if (mood === "tech") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-[0.04]">
          <div className="absolute top-0 left-[8%] text-xs font-mono text-primary animate-digital-rain" style={{ animationDuration: '12s', animationDelay: '0s' }}>
            010101<br/>101010<br/>001100<br/>110011<br/>&lt;/&gt;<br/>{"{"}<br/>{"}"}
          </div>
          <div className="absolute top-0 left-[28%] text-xs font-mono text-primary animate-digital-rain" style={{ animationDuration: '16s', animationDelay: '3s' }}>
            110011<br/>001100<br/>101010<br/>010101<br/>const<br/>let
          </div>
          <div className="absolute top-0 left-[48%] text-xs font-mono text-primary animate-digital-rain" style={{ animationDuration: '14s', animationDelay: '1.5s' }}>
            000111<br/>111000<br/>010101<br/>101010<br/>function<br/>=&gt;
          </div>
          <div className="absolute top-0 right-[28%] text-xs font-mono text-primary animate-digital-rain" style={{ animationDuration: '18s', animationDelay: '5s' }}>
            101010<br/>010101<br/>110011<br/>001100<br/>[]<br/>console
          </div>
          <div className="absolute top-0 right-[8%] text-xs font-mono text-primary animate-digital-rain" style={{ animationDuration: '13s', animationDelay: '2.5s' }}>
            010101<br/>101010<br/>001100<br/>110011<br/>&lt;div&gt;<br/>await
          </div>
        </div>
      );
    }

    if (mood === "art") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Morphing Blobs */}
          <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-gradient-to-tr from-primary/10 to-[#EC4899]/5 rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%] blur-2xl animate-morph-blob opacity-[0.25]" style={{ animationDuration: '24s' }} />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-[#7C3AED]/5 to-primary/10 rounded-[30%_70%_52%_48%_/_60%_40%_60%_40%] blur-2xl animate-morph-blob opacity-[0.22]" style={{ animationDuration: '30s', animationDelay: '-10s' }} />
          {/* Paint brush / Palette emojis floating */}
          <div className="absolute bottom-[-20px] left-[15%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '13s', animationDelay: '2s' }}>🎨</div>
          <div className="absolute bottom-[-20px] right-[15%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '16s', animationDelay: '6s' }}>🖌️</div>
        </div>
      );
    }

    if (mood === "food") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          <div className="absolute bottom-[-20px] left-[10%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '11s', animationDelay: '0s' }}>🍕</div>
          <div className="absolute bottom-[-20px] left-[35%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '15s', animationDelay: '4s' }}>🍔</div>
          <div className="absolute bottom-[-20px] left-[60%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '12s', animationDelay: '7s' }}>🍜</div>
          <div className="absolute bottom-[-20px] right-[20%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '14s', animationDelay: '2s' }}>☕</div>
          <div className="absolute bottom-[-20px] right-[5%] text-5xl opacity-[0.04] animate-float-up" style={{ animationDuration: '10s', animationDelay: '5s' }}>🍩</div>
        </div>
      );
    }

    if (mood === "2am") {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Crescent Moon */}
          <div className="absolute top-[10%] right-[10%] opacity-[0.04] flex items-center justify-center">
            <svg className="w-[180px] h-[180px] animate-pulse" style={{ animationDuration: '10s' }} viewBox="0 0 100 100" fill="none" stroke="#7C3AED" strokeWidth="1.2">
              <path d="M80 20 A 40 40 0 1 0 80 80 A 30 30 0 1 1 80 20 Z" fill="rgba(124, 58, 237, 0.15)" />
            </svg>
          </div>
          {/* Twinkling Stars */}
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[45%] left-[8%] w-1.5 h-1.5 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[65%] left-[25%] w-2 h-2 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-[30%] right-[22%] w-1.5 h-1.5 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-[35%] right-[35%] w-2 h-2 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[15%] left-[40%] w-2.5 h-2.5 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '3s' }} />
          {/* Floating Clouds */}
          <div className="absolute bottom-[20px] left-[5%] text-4xl opacity-[0.04] animate-float-up" style={{ animationDuration: '18s', animationDelay: '2s' }}>🌙</div>
          <div className="absolute bottom-[-20px] right-[12%] text-4xl opacity-[0.03] animate-float-up" style={{ animationDuration: '15s', animationDelay: '6s' }}>💤</div>
        </div>
      );
    }

    // Default Fallback (twinkling star dust with a soft breathing radial glow)
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20px] left-[15%] text-xl opacity-[0.05] animate-float-up" style={{ animationDuration: '16s', animationDelay: '0s' }}>✦</div>
        <div className="absolute bottom-[-20px] left-[45%] text-2xl opacity-[0.03] animate-float-up" style={{ animationDuration: '20s', animationDelay: '4s' }}>✦</div>
        <div className="absolute bottom-[-20px] right-[30%] text-xl opacity-[0.04] animate-float-up" style={{ animationDuration: '18s', animationDelay: '2s' }}>✦</div>
        <div className="absolute bottom-[-20px] right-[10%] text-2xl opacity-[0.03] animate-float-up" style={{ animationDuration: '22s', animationDelay: '6s' }}>✦</div>
      </div>
    );
  };

  // STEP 1: TAGS SCREEN
  if (step === "tags") {
    return (
      <div className="bg-background text-textPrimary h-screen-safe relative bg-grain flex flex-col justify-between px-4 py-8 overflow-hidden">
        {renderMoodBackground(activeMood)}
        
        <header className="max-w-xl mx-auto w-full flex items-center justify-between z-10">
          <Link href="/" className="text-xl font-semibold tracking-tight text-primary">
            chatjeen
          </Link>
          <Link href="/" className="text-xs text-textMuted hover:text-white flex items-center gap-1 min-h-[44px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back Home
          </Link>
        </header>

        <main className="max-w-md mx-auto w-full space-y-8 my-auto z-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Pick your vibe 🎯
            </h1>
            <p className="text-xs text-textMuted">
              Choose 1 to 3 interests to match with compatible people. Or start talking instantly.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-textMuted uppercase tracking-wider block">
              Your Nickname (optional)
            </label>
            <input
              type="text"
              value={nickname === "Stranger" ? "" : nickname}
              onChange={(e) => {
                const val = e.target.value.slice(0, 15);
                setNickname(val || "Stranger");
                if (typeof window !== "undefined") {
                  localStorage.setItem("chatjeen_nickname", val || "Stranger");
                }
              }}
              placeholder="Stranger"
              className="w-full py-3 px-4 rounded-default bg-surface border border-border focus:border-primary text-sm text-textPrimary placeholder-[#52525B] focus:outline-none focus:ring-3 focus:ring-primary/15 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {INTEREST_TAGS.map((tag) => {
              const selected = selectedTags.includes(tag.val);
              return (
                <button
                  key={tag.val}
                  onClick={() => handleTagToggle(tag.val)}
                  className={`py-3 px-4 rounded-default border font-medium text-xs transition-all duration-150 transform active:scale-[0.98] min-h-[44px] ${
                    selected
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-surface border-border text-textMuted hover:text-textPrimary hover:border-textMuted"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2.5">
              <button
                onClick={handleFindMatch}
                disabled={selectedTags.length === 0}
                className={`w-full py-3.5 rounded-full font-semibold text-center text-xs flex items-center justify-center gap-1.5 shadow-sm min-h-[44px] ${
                  selectedTags.length > 0
                    ? "bg-primary text-white cursor-pointer hover:bg-primary/95 transition-colors transform active:scale-[0.98]"
                    : "bg-surface border border-border text-textMuted/40 cursor-not-allowed"
                }`}
              >
                Find my match &rarr;
              </button>

              <button
                onClick={handleSkipAndMatchRandom}
                className="w-full py-3.5 rounded-full font-semibold text-center text-xs bg-surface hover:bg-surface2 text-textPrimary border border-border transition-colors min-h-[44px]"
              >
                Skip, match me randomly
              </button>
            </div>

            {/* Community Guidelines Notice */}
            <div className="text-center">
              <p className="text-[11px] text-textMuted/60 leading-normal max-w-xs mx-auto">
                By chatting you agree to be a decent human. <br />
                No explicit content. No personal info. Just good conversation.{" "}
                <Link href="/safety" className="underline hover:text-white transition-colors">
                  Full guidelines &rarr;
                </Link>
              </p>
            </div>
          </div>
        </main>

        <footer className="max-w-xl mx-auto w-full text-center text-[11px] text-textMuted/40 z-10">
          Fully Anonymous · No accounts, no files, no logs.
        </footer>
      </div>
    );
  }

  // STEP 2: MATCHING RADAR SCREEN
  if (step === "matching") {
    return (
      <div className="bg-background text-textPrimary h-screen-safe relative bg-grain flex flex-col justify-between px-4 py-8 overflow-hidden">
        {renderMoodBackground(activeMood)}

        <header className="max-w-xl mx-auto w-full flex items-center justify-between z-10">
          <span className="text-xl font-semibold tracking-tight text-primary">
            chatjeen
          </span>
          <button 
            onClick={() => setStep("tags")} 
            className="text-xs text-textMuted hover:text-white flex items-center gap-1 border border-border px-3 py-1.5 rounded-full min-h-[44px]"
          >
            Cancel
          </button>
        </header>

        <main className="max-w-md mx-auto w-full flex flex-col items-center justify-center space-y-12 my-auto z-10">
          {/* 3 Rings Concentric Ring Pulse radar animation */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 border border-primary/20 rounded-full animate-ring-pulse" style={{ animationDelay: '0s' }} />
            <div className="absolute inset-0 border border-primary/20 rounded-full animate-ring-pulse" style={{ animationDelay: '500ms' }} />
            <div className="absolute inset-0 border border-primary/20 rounded-full animate-ring-pulse" style={{ animationDelay: '1000ms' }} />
            
            <div className="z-10 bg-primary w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Bot className="w-7 h-7" />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {MATCHING_TEXTS[matchingTextIndex]}
            </h2>
            
            {/* Global Live Map Hint cycling */}
            <p className="text-xs text-textMuted/80 tracking-wide font-medium min-h-[16px]">
              {MAP_HINTS[mapHintIndex]}
            </p>
          </div>

          {/* Show tags as chips */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {selectedTags.map((tagVal) => {
                const tagObj = INTEREST_TAGS.find((t) => t.val === tagVal);
                return (
                  <span 
                    key={tagVal} 
                    className="text-xs font-semibold bg-surface border border-border text-textPrimary px-3 py-1.5 rounded-full"
                  >
                    {tagObj?.label || tagVal}
                  </span>
                );
              })}
            </div>
          )}
        </main>

        <footer className="max-w-xl mx-auto w-full text-center text-[11px] text-textMuted/40 z-10">
          Match queue active...
        </footer>
      </div>
    );
  }

  // STEP 3: REFLECTION STATE OVERLAY
  if (step === "reflection" && reflectionData) {
    return (
      <div className="bg-background text-textPrimary h-screen-safe relative bg-grain flex flex-col justify-between px-4 py-8 overflow-hidden">
        {renderMoodBackground(activeMood)}

        <header className="max-w-xl mx-auto w-full flex items-center justify-between z-10">
          <span className="text-xl font-semibold tracking-tight text-primary">
            chatjeen
          </span>
        </header>

        <main className="max-w-md mx-auto w-full flex flex-col items-center justify-center space-y-8 my-auto z-10">
          <div className="text-center space-y-6 max-w-sm w-full bg-surface border border-border p-8 rounded-card shadow-xl animate-bubble-pop z-10">
            <div className="text-4xl animate-bounce">👋</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                That conversation is gone forever.
              </h3>
              <p className="text-xs text-textMuted leading-relaxed font-medium">
                {reflectionData.wasSkippedByPartner ? (
                  `${partnerNickname} moved on — that's okay. Your next conversation might be the good one.`
                ) : reflectionData.messageCount >= 5 ? (
                  `You exchanged ${reflectionData.messageCount} messages with ${partnerNickname} from ${getFlagEmoji(reflectionData.country)} ${reflectionData.country}. It was real.`
                ) : (
                  "Not every spark lights up. The next one might."
                )}
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <button
                onClick={handleFindMatchAfterReflection}
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all min-h-[44px]"
              >
                Find next &rarr;
              </button>
              <p className="text-[10px] text-textMuted/40">
                No logs. That conversation never existed.
              </p>
            </div>
          </div>
        </main>

        <footer className="max-w-xl mx-auto w-full text-center text-[11px] text-textMuted/40 z-10">
          Resetting session ephemeral state...
        </footer>
      </div>
    );
  }

  // STEP 4: DISCONNECT STATE OVERLAY
  if (step === "disconnected" && reflectionData) {
    return (
      <div className="bg-background text-textPrimary h-screen-safe relative bg-grain flex flex-col justify-between px-4 py-8 overflow-hidden">
        {renderMoodBackground(activeMood)}

        <header className="max-w-xl mx-auto w-full flex items-center justify-between z-10">
          <Link href="/" className="text-xl font-semibold tracking-tight text-primary">
            chatjeen
          </Link>
        </header>

        <main className="max-w-md mx-auto w-full flex flex-col items-center justify-center space-y-6 my-auto z-10">
          <div className="bg-surface border border-border p-8 rounded-card max-w-sm w-full text-center space-y-6 shadow-xl animate-bubble-pop z-10">
            <div className="text-4xl animate-bounce">👋</div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {disconnectHeadline}
              </h3>
              <p className="text-xs text-textMuted leading-relaxed">
                {partnerNickname} disconnected. Ready to meet someone new?
              </p>
            </div>

            {/* Reflection stats card if convo > 5 messages */}
            {reflectionData.messageCount >= 5 && (
              <div className="bg-surface2 border border-border p-4 rounded-xl text-left space-y-1">
                <div className="text-xs text-textMuted">
                  You just had a <span className="text-white font-bold">{reflectionData.messageCount}-message</span> conversation with {partnerNickname} from {getFlagEmoji(reflectionData.country)} <span className="text-white font-semibold">{reflectionData.country}</span>.
                </div>
                <div className="text-[10px] text-textMuted/50 italic">
                  It&apos;s gone now. That was the point.
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                onClick={handleFindMatchAfterReflection}
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transform active:scale-[0.98] transition-all min-h-[44px]"
              >
                Chat with someone new &rarr;
              </button>
              <Link
                href="/"
                className="block w-full py-3 bg-transparent hover:bg-surface2 text-textMuted hover:text-white rounded-full font-semibold text-xs border border-transparent transition-colors text-center min-h-[44px] flex items-center justify-center"
              >
                Take a break
              </Link>
            </div>
          </div>
        </main>

        <footer className="max-w-xl mx-auto w-full text-center text-[11px] text-textMuted/40 z-10">
          EPHEMERAL SESSION · ZERO ARCHIVES
        </footer>
      </div>
    );
  }

  // STEP 5: LIVE CHAT VIEW
  return (
    <div className="bg-background text-textPrimary h-screen-safe flex flex-col justify-between overflow-hidden relative">
      {renderMoodBackground(activeMood)}
      
      {/* 56px FIXED HEADER BAR */}
      <header className="h-[56px] min-h-[56px] bg-surface/90 backdrop-blur-md border-b border-border px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary shrink-0" />
          <div className="min-w-0">
            <div className="font-semibold text-sm text-white flex items-center gap-2">
              <span>Chatting with {partnerNickname}</span>
              <span className="text-[11px] font-mono bg-surface2 border border-border px-1.5 py-0.5 rounded text-textMuted flex items-center gap-1 shrink-0 select-none">
                ⏱️ {formatTime(chatDuration)}
              </span>
            </div>
            <div className="text-[12px] text-textMuted flex items-center gap-1.5 leading-none mt-0.5">
              <span>{getFlagEmoji(partnerCountry)} {partnerCountry}</span>
              {partnerInterests.length > 0 && (
                <>
                  <span className="text-textMuted/30">•</span>
                  <span className="truncate max-w-[120px] sm:max-w-xs">
                    Common: {partnerInterests.map(val => INTEREST_TAGS.find(t => t.val === val)?.label || val).join(", ")}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Streak indicator badge (Visible on all screens if active) */}
        <div className="hidden md:block">
          {getStreakBadge()}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <div className="md:hidden mr-1">
            {chatMessagesCount >= 10 && (
              <span className="bg-primary/20 text-orange-400 border border-orange-500/20 text-[10px] font-bold px-2 py-1 rounded-full">
                🔥 {chatMessagesCount}
              </span>
            )}
          </div>
          <button 
            onClick={handleReportPartner}
            className="p-2 text-textMuted hover:text-danger transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/5"
            title="Report partner"
          >
            <Flag className="w-4 h-4" />
          </button>
          <button 
            onClick={handleSkipPartner}
            className={`px-4 py-2 bg-surface2 border border-border hover:bg-border text-accent rounded-full font-medium text-xs flex items-center gap-1 transition-all min-h-[36px] ${
              isSkipping ? "animate-shake" : ""
            }`}
          >
            ⚡ Skip
          </button>
        </div>
      </header>

      {/* INDEPENDENT SCROLL MESSAGE AREA */}
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-transparent flex flex-col justify-end overflow-x-hidden -webkit-overflow-scrolling-touch z-10">
        
        {/* Push content down to bottom if list is short */}
        <div className="flex-grow" />

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="my-auto text-center space-y-3 py-12">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-textMuted">Messages are not stored. Ever.</h4>
              <p className="text-[13px] text-textMuted/60">Say hi or use the AI suggestions below &darr;</p>
            </div>
          </div>
        )}

        {/* Message Log mapping */}
        <div className="space-y-0.5">
          {messages.map((msg, idx) => {
            const isMe = msg.sender === "me";
            
            // Check spacing rules
            const isSameSender = idx > 0 && messages[idx - 1].sender === msg.sender;
            const mtClass = isSameSender ? "mt-1.5" : "mt-3.5";

            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} ${mtClass}`}>
                <div className="flex flex-col max-w-[72%]">
                  <div className={`p-3.5 text-[15px] leading-relaxed animate-bubble-pop ${
                    isMe 
                      ? "bg-primary text-white rounded-[18px_18px_4px_18px]" 
                      : "bg-surface border border-border text-textPrimary rounded-[18px_18px_18px_4px]"
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Timestamp underneath bubble */}
                  <div className={`text-[11px] mt-1 text-right select-none ${
                    isMe ? "text-primary/60 pr-1.5" : "text-textMuted/50 pl-1.5"
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Typing indicator */}
        {isPartnerTyping && (
          <div className="flex justify-start mt-3.5 animate-bubble-pop">
            <div className="bg-surface border border-border px-4 py-3.5 rounded-[18px_18px_18px_4px] flex items-center gap-1.5">
              <span className="w-2 h-2 bg-textMuted rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }} />
              <span className="w-2 h-2 bg-textMuted rounded-full animate-bounce-dot" style={{ animationDelay: '0.15s' }} />
              <span className="w-2 h-2 bg-textMuted rounded-full animate-bounce-dot" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* DYNAMIC CONVERSATION STARTER GAMES (PHASE 2) */}
      {chatMessagesCount >= 5 && (
        <div className="bg-surface/90 backdrop-blur-md border-t border-border p-3 space-y-2 z-20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-accent flex items-center gap-1 uppercase tracking-wider">
              🎲 Want to play a quick game?
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => handlePlayGame("would_you_rather")}
              disabled={gameLoading !== null}
              className="text-xs px-3.5 py-2 rounded-full bg-surface2 border border-border text-zinc-300 hover:border-primary hover:text-white transition-colors shrink-0 disabled:opacity-50 min-h-[36px]"
            >
              {gameLoading === "would_you_rather" ? "Generating..." : "🤔 Would you rather..."}
            </button>
            <button
              onClick={() => handlePlayGame("hot_takes")}
              disabled={gameLoading !== null}
              className="text-xs px-3.5 py-2 rounded-full bg-surface2 border border-border text-zinc-300 hover:border-primary hover:text-white transition-colors shrink-0 disabled:opacity-50 min-h-[36px]"
            >
              {gameLoading === "hot_takes" ? "Generating..." : "🔥 Hot takes only"}
            </button>
            <button
              onClick={() => handlePlayGame("two_truths_one_lie")}
              disabled={gameLoading !== null}
              className="text-xs px-3.5 py-2 rounded-full bg-surface2 border border-border text-zinc-300 hover:border-primary hover:text-white transition-colors shrink-0 disabled:opacity-50 min-h-[36px]"
            >
              {gameLoading === "two_truths_one_lie" ? "Generating..." : "🤥 2 truths 1 lie"}
            </button>
            <button
              onClick={() => handlePlayGame("ama")}
              disabled={gameLoading !== null}
              className="text-xs px-3.5 py-2 rounded-full bg-surface2 border border-border text-zinc-300 hover:border-primary hover:text-white transition-colors shrink-0 disabled:opacity-50 min-h-[36px]"
            >
              {gameLoading === "ama" ? "Generating..." : "💬 Ask me anything"}
            </button>
          </div>
        </div>
      )}

      {/* CONDITIONAL AI ICEBREAKER PANEL (Only shown in early conversation stage < 5 messages) */}
      {icebreakerOpen && icebreakers.length > 0 && chatMessagesCount < 5 && (
        <div className="bg-surface/90 backdrop-blur-md border-t border-b border-border p-4 space-y-3 animate-slide-up z-20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-accent flex items-center gap-1">
              🤖 AI-suggested openers
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRegenerateIcebreakers}
                disabled={icebreakersLoading}
                className="text-xs font-semibold text-accent hover:opacity-90 disabled:opacity-50 min-h-[30px] flex items-center justify-center"
              >
                🎲 New ideas
              </button>
              <button 
                onClick={() => setIcebreakerOpen(false)}
                className="text-textMuted hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Dismiss icebreakers"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {icebreakersLoading ? (
            <div className="flex items-center gap-2 py-1.5 text-xs text-textMuted">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching suggestions...
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
              {icebreakers.map((opener, idx) => {
                const isSelected = selectedChipIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(opener);
                      setSelectedChipIndex(idx);
                      setTimeout(() => adjustHeight(), 50);
                    }}
                    className={`text-xs px-3.5 py-2.5 rounded-full whitespace-nowrap shrink-0 transition-all font-medium border min-h-[36px] ${
                      isSelected
                        ? "bg-primary/10 border-primary text-white"
                        : "bg-surface2 border-border text-zinc-300 hover:border-primary hover:text-white"
                    }`}
                  >
                    🤖 {opener}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FIXED INPUT BAR */}
      <footer className="bg-surface/90 backdrop-blur-md border-t border-border p-3 flex flex-col relative z-30 pb-[calc(12px+env(safe-area-inset-bottom))]">
        
        {/* Client profanity/email safety warning banner */}
        {warningMsg && (
          <div className="mb-2 p-2.5 bg-danger/10 border border-danger/20 rounded-default text-[12px] text-danger font-medium text-center max-w-lg mx-auto w-full">
            {warningMsg}
          </div>
        )}

        {/* Inline Emoji Picker Container */}
        {showEmojiPicker && (
          <div className="absolute bottom-[72px] right-4 z-50 shadow-2xl rounded-default border border-border overflow-hidden">
            <EmojiPicker 
              theme={"dark" as any}
              onEmojiClick={handleEmojiSelect}
              width={320}
              height={360}
            />
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex gap-2 items-end w-full max-w-3xl mx-auto">
          {/* Emoji Toggle button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-3 bg-surface2 border border-border text-textMuted hover:text-white rounded-full transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-border"
            title="Toggle emojis"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Growing textarea input bar */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Say something... or use AI suggestions ↑"
              className="w-full py-3 px-4 rounded-card bg-surface2 border border-border focus:border-primary text-[16px] text-textPrimary placeholder-[#52525B] focus:outline-none focus:ring-3 focus:ring-primary/15 resize-none overflow-y-auto block min-h-[44px] max-h-[120px] scrollbar-thin"
              style={{ height: "auto" }}
            />
          </div>

          {/* Rounded Send button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`w-[44px] h-[44px] rounded-full shrink-0 flex items-center justify-center transition-all duration-150 ${
              inputText.trim() 
                ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer" 
                : "bg-surface2 border border-border text-[#52525B] cursor-not-allowed"
            }`}
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}

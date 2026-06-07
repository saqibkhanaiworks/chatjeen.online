import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Offline/Mock mode fallback prompts if no key is present or on API error
const MOCK_GAME_PROMPTS: Record<string, string[]> = {
  would_you_rather: [
    "Would you rather always speak in rhyme or have to sing everything you say? 🎵",
    "Would you rather find true love today or win $10 million in ten years? 💰",
    "Would you rather live in a world with no music or a world with no movies? 🍿",
    "Would you rather be able to read minds or fly but only 2 inches off the ground? 🦅"
  ],
  hot_takes: [
    "Hot take: Cereal is technically soup. Let's debate. 🥣",
    "Hot take: Pineapple belongs on pizza, and it is actually elite. 🍕",
    "Hot take: Texting is superior to calling in every single scenario. 📱",
    "Hot take: Putting ketchup on mac and cheese should be illegal. 🧀"
  ],
  two_truths_one_lie: [
    "Let's play 2 Truths & 1 Lie. Tell me yours, and I'll guess the fake one! 🤥",
    "Give me three facts about yourself: two true, one complete lie. 🎭",
    "Your turn: tell me two truths and one lie. No cheating! 🕵️"
  ],
  ama: [
    "Ask me anything. No filters, no limits. 💬",
    "What is one question you've wanted to ask someone today but haven't? 🧠",
    "What is a secret opinion or habit you've never shared with anyone? 🤫"
  ]
};

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  let gameType = "would_you_rather";
  try {
    const body = await req.json().catch(() => ({}));
    if (body && body.gameType) {
      gameType = body.gameType;
    }

    if (!genAI) {
      console.log(`ℹ️ Gemini API key missing. Operating games endpoint in Mock mode for type: ${gameType}`);
      const pool = MOCK_GAME_PROMPTS[gameType] || MOCK_GAME_PROMPTS.would_you_rather;
      const randomPrompt = pool[Math.floor(Math.random() * pool.length)];
      return NextResponse.json({ question: randomPrompt });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let instructions = "";
    if (gameType === "would_you_rather") {
      instructions = "Generate a single, super fun, surprising, and witty 'Would You Rather' question for two strangers chatting online. Tone: playful Gen-Z, engaging, no cringe. Max 18 words. Return ONLY the question.";
    } else if (gameType === "hot_takes") {
      instructions = "Generate a single spicy but harmless 'Hot Take' debate starter or unpopular opinion for two strangers chatting online. Tone: playful Gen-Z, engaging, no cringe. Max 18 words. Return ONLY the statement.";
    } else if (gameType === "two_truths_one_lie") {
      instructions = "Generate a single playful invitation or prompt for a game of '2 Truths and a Lie' for two strangers chatting. Tone: playful Gen-Z. Max 18 words. Return ONLY the text.";
    } else {
      instructions = "Generate a single fun, deep, or slightly personal 'Ask Me Anything' prompt to keep a conversation going. Tone: playful Gen-Z. Max 18 words. Return ONLY the question.";
    }

    const result = await model.generateContent(instructions);
    const questionText = result.response.text().trim().replace(/^"|"$/g, ""); // strip quotes

    return NextResponse.json({ question: questionText });
  } catch (err) {
    console.error("❌ Error generating game prompt from Gemini:", err);
    // Fallback to safe offline options
    const pool = MOCK_GAME_PROMPTS[gameType] || MOCK_GAME_PROMPTS.would_you_rather;
    const randomPrompt = pool[Math.floor(Math.random() * pool.length)];
    return NextResponse.json({ question: randomPrompt });
  }
}

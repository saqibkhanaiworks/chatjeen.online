import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { text = "" } = await req.json();

    if (!text.trim()) {
      return NextResponse.json({ status: "SAFE" });
    }

    if (!genAI) {
      // Offline/Mock Mode: Auto-approve messages (since they already pass the client regex filter)
      return NextResponse.json({ status: "SAFE" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Is the following message harmful, highly sexual, abusive, or containing hate speech? Reply with only one word: SAFE or BLOCK.\n\nMessage: "${text}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim().toUpperCase();

    if (responseText.includes("BLOCK")) {
      console.log(`🛡️ Message blocked by AI moderation: "${text}"`);
      return NextResponse.json({ status: "BLOCK" });
    }

    return NextResponse.json({ status: "SAFE" });
  } catch (err) {
    console.error("❌ AI Moderation Error:", err);
    // Fallback to SAFE to prevent locking out conversations if the model/network is down
    return NextResponse.json({ status: "SAFE" });
  }
}

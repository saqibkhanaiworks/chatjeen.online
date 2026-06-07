import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Fallback mock icebreakers database for offline/no-key mode
const MOCK_ICEBREAKERS: Record<string, string[]> = {
  music: [
    "Send the last song you added to your playlist. No lying. 🎵",
    "Who is your absolute favorite artist right now? 🎤",
    "What is your go-to song when you get the aux cord? 🚗"
  ],
  gaming: [
    "What is your all-time favorite game? 🎮",
    "Are you a casual gamer or a sweat? 🏆",
    "Rank the top 3 video game soundtracks."
  ],
  travel: [
    "If you could teleport anywhere right now, where to? ✈️",
    "What is the worst travel experience you have ever had? 🌋",
    "Window seat or aisle seat? Choose wisely. 💺"
  ],
  memes: [
    "Explain your favorite meme format in under ten words. 😂",
    "Send the last meme that made you actually laugh. 📱",
    "Are you a TikTok scroller or a Reddit Lurker? 🤖"
  ],
  philosophy: [
    "Do you think we are living in a computer simulation? 🤔",
    "What is a controversial opinion you hold that is actually true? 🧠",
    "Is water wet? Let us debate. 🌊"
  ],
  movies: [
    "What movie can you watch a hundred times without getting bored? 🎬",
    "Who is the best villain in cinematic history? 🍿",
    "Rank your top 3 comfort movies."
  ],
  sports: [
    "What sport do you watch or play the most? ⚽",
    "Who is the greatest athlete of all time? 🏆",
    "Do you prefer playing sports or watching them from bed? 🛌"
  ],
  tech: [
    "iPhone or Android? Do not start a war. 💻",
    "What is the most useless piece of tech you own? 🔌",
    "Will AI take over the world or just write our emails? 🤖"
  ],
  art: [
    "Do you like drawing, painting, or just looking at pretty pictures? 🎨",
    "Who is your favorite artist or creator? 🖌️",
    "Is AI art actual art or just copy-pasting? 🖼️"
  ],
  food: [
    "Does pineapple belong on pizza? This is a test. 🍕",
    "What is your ultimate comfort food? 🍔",
    "If you could only eat one cuisine forever, what is it? 🍣"
  ]
};

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { tags = [] } = await req.json();

    if (!genAI) {
      console.log("ℹ️ Gemini API key missing. Operating in Mock Fallback Mode.");
      
      // Pull items from matching mock keys
      let pool: string[] = [];
      tags.forEach((tag: string) => {
        if (MOCK_ICEBREAKERS[tag]) {
          pool = [...pool, ...MOCK_ICEBREAKERS[tag]];
        }
      });

      // If pool is empty, grab general ones
      if (pool.length === 0) {
        pool = [
          ...MOCK_ICEBREAKERS.music,
          ...MOCK_ICEBREAKERS.memes,
          ...MOCK_ICEBREAKERS.philosophy
        ];
      }

      // Shuffle and pick 3
      const shuffled = pool.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      return NextResponse.json({ icebreakers: selected });
    }

    // Call Real Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 3 short, fun, witty conversation starters for two strangers who both like ${tags.join(", ")}. Each under 12 words. Tone: playful Gen-Z, no cringe. Return ONLY as a JSON array of strings, for example: ["Opener 1", "Opener 2", "Opener 3"]. Do not include markdown code block formatting.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean potential markdown syntax if Gemini ignores instruction
    const cleanText = responseText.replace(/```json|```/g, "").trim();
    const parsedIcebreakers = JSON.parse(cleanText);

    return NextResponse.json({ icebreakers: parsedIcebreakers });
  } catch (err) {
    console.error("❌ Error generating icebreakers:", err);
    // Fallback on error
    return NextResponse.json({ 
      icebreakers: [
        "What is the most interesting thing that happened to you today? 🌟",
        "If you could teleport anywhere right now, where would you go? ✈️",
        "Send the last song you listened to. No lying. 🎵"
      ] 
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { genre, premise, characters, tone, chapterCount } = await req.json();

    const prompt = `You are a professional novel writing assistant. Write a detailed novel outline or opening chapters based on the following:

**Genre:** ${genre || "General Fiction"}
**Tone:** ${tone || "Engaging"}
**Chapter Count:** ${chapterCount || "Full novel outline with 10 chapters"}

**Premise:**
${premise || "A compelling story premise..."}

**Characters:**
${characters || "Protagonist and key characters..."}

Please provide:
1. A compelling opening hook
2. Character descriptions with motivations
3. A ${chapterCount || "10"}-chapter story arc with rising action, climax, and resolution
4. Dialogue prompts for key scenes
5. Suggested subplot threads

Write with vivid, immersive prose.`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.8,
    });

    const result = completion.choices[0]?.message?.content || "No content generated.";
    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error("DeepSeek API error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}

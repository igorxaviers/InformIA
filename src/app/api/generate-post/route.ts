import { NextResponse } from "next/server";
import { GeminiProvider } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const provider = new GeminiProvider(apiKey);
    const generatedPost = await provider.generatePost(topic);

    return NextResponse.json(generatedPost);
  } catch (error: any) {
    console.error("Error generating post:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

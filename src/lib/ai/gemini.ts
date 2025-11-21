import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, GeneratedPost, GeneratedPostSchema } from "./types";

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generatePost(topic: string): Promise<GeneratedPost> {
    const prompt = `
      You are an expert SEO content writer and blog editor.
      Your task is to generate a high-quality, engaging blog post based on the following topic: "${topic}".
      
      Return ONLY a valid JSON object with the following structure:
      {
        "title": "An engaging, SEO-optimized title",
        "content": "The full blog post content in HTML format. Use <h2>, <h3>, <p>, <ul>, <li>, <strong>, etc. Do NOT use Markdown.",
        "summary": "A concise summary of the post (max 200 characters).",
        "slug": "a-url-friendly-slug-based-on-title",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
        "seo_title": "Title tag for SEO (max 60 chars)",
        "seo_description": "Meta description for SEO (max 160 chars)",
        "hero_image_url": "A placeholder image URL relevant to the topic (e.g. from https://placehold.co/600x400?text=Topic)"
      }

      Ensure the content is informative, well-structured, and professional.
      Do not include any markdown formatting (like \`\`\`json) around the JSON output. Just the raw JSON string.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Find the first '{' and the last '}' to extract the JSON object
      const firstBrace = text.indexOf("{");
      const lastBrace = text.lastIndexOf("}");
      
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No JSON object found in response");
      }

      const cleanedText = text.substring(firstBrace, lastBrace + 1);
      const json = JSON.parse(cleanedText);
      return GeneratedPostSchema.parse(json);
    } catch (error) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Failed to generate valid post content from AI.");
    }
  }
}

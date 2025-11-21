import { z } from "zod";

export interface GeneratedPost {
  title: string;
  content: string;
  summary: string;
  slug: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  hero_image_url: string;
}

export const GeneratedPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  summary: z.string(),
  slug: z.string(),
  tags: z.array(z.string()),
  seo_title: z.string(),
  seo_description: z.string(),
  hero_image_url: z.string(),
});

export interface AIProvider {
  generatePost(topic: string): Promise<GeneratedPost>;
}

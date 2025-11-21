import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/lib/database.types";

export type Tag = Database["public"]["Tables"]["tags"]["Row"];

export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }

  return data || [];
}

export async function createTag(name: string, slug: string): Promise<Tag> {
  const { data, error } = await supabase
    .from("tags")
    .insert({ name, slug })
    .select()
    .single();

  if (error) {
    console.error("Error creating tag:", error);
    throw error;
  }

  return data;
}

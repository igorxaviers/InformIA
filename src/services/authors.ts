import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/lib/database.types";

export type Author = Database["public"]["Tables"]["authors"]["Row"];

export async function getAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }

  return data || [];
}

export async function createAuthor(name: string): Promise<Author> {
  const { data, error } = await supabase
    .from("authors")
    .insert({ name })
    .select()
    .single();

  if (error) {
    console.error("Error creating author:", error);
    throw error;
  }

  return data;
}

import { supabase } from "@/lib/supabaseClient";

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data.map(category => category.name);
}

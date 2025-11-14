// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Usando alias de caminho

export async function GET() {
  try {
    // Buscamos os artigos e fazemos um JOIN para pegar o nome do autor e da categoria
    const { data, error } = await supabase
      .from('posts') // Assumindo que sua tabela se chama 'posts'
      .select(`
        id,
        title,
        slug,
        summary,
        published_at,
        authors ( name ),
        categories ( name )
      `)
      .order('published_at', { ascending: false }); // Artigos mais recentes primeiro

    if (error) {
      throw error;
    }

    return NextResponse.json({ articles: data });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

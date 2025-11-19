import { supabase } from "@/lib/supabaseClient";
import { IPostBlog, IPostBlogList } from "@/types/postblog";

export async function getPosts(page: number = 1, limit: number = 10): Promise<IPostBlogList[]> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      description,
      slug,
      hero_image_url,
      published_at,
      authors (
        id,
        name,
        avatar_url
      ),
      posts_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(start, end);

  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }

  return mapPosts(data);
}

export async function getPostsSearch(search: string): Promise<IPostBlogList[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      description,
      slug,
      hero_image_url,
      published_at,
      authors (
        id,
        name,
        avatar_url
      ),
      posts_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .ilike('title', `%${search}%`)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error searching posts:', error);
    throw error;
  }

  return mapPosts(data);
}

function mapPosts(data: any[]): IPostBlogList[] {
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    description: post.description || '',
    imageUrl: post.hero_image_url || undefined,
    slug: post.slug,
    date: post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : undefined,
    author: post.authors ? {
      id: post.authors.id,
      name: post.authors.name,
      avatarUrl: post.authors.avatar_url || undefined
    } : undefined,
    tags: post.posts_tags ? post.posts_tags.map((pt: any) => ({
      id: pt.tags.id,
      name: pt.tags.name,
      slug: pt.tags.slug
    })) : []
  }));
}

export async function getPostBySlug(slug: string): Promise<IPostBlog | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      description,
      slug,
      hero_image_url,
      published_at,
      content,
      authors (
        id,
        name,
        avatar_url
      ),
      posts_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching post by slug:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    imageUrl: data.hero_image_url || undefined,
    slug: data.slug,
    date: data.published_at ? new Date(data.published_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : undefined,
    content: data.content || '',
    publishedDate: data.published_at || '', // Added to satisfy IPostBlog
    author: data.authors ? {
      id: data.authors.id,
      name: data.authors.name,
      avatarUrl: data.authors.avatar_url || undefined
    } : undefined,
    tags: data.posts_tags ? data.posts_tags.map((pt: any) => ({
      id: pt.tags.id,
      name: pt.tags.name,
      slug: pt.tags.slug
    })) : []
  };
}

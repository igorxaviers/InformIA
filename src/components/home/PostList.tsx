import { getPosts, getPostsSearch } from "@/services/posts";
import { PostBlogCard } from "@/components/ui/post-blog-card";

export async function PostList({ search }: { search?: string }) {
  try {
    const posts = search 
      ? await getPostsSearch(search) 
      : await getPosts(1, 10);

    if (posts.length === 0) {
      return (
        <div className="w-full text-center py-10 text-zinc-500">
          <p>Nenhum post encontrado{search ? ` para "${search}"` : ''}.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6 w-full">
        {posts.map((post) => (
          <PostBlogCard key={post.id} {...post} />
        ))}
      </div>
    );
  } catch (error: any) {
    return <div className="text-red-500">Error loading posts: {error.message}</div>;
  }
}

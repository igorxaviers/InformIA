import PostForm from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Create a new blog post manually or generate it using AI.
        </p>
      </div>
      <PostForm />
    </div>
  );
}

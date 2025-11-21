import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/services/posts';
import { Badge } from '@/components/ui/badge';
import { Author } from '@/components/postblog/author';
import { Metadata } from 'next';

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

const metadata: Metadata = {
  title: '',
  description: ''
}

export default async function PostDetailPage(props: PostDetailPageProps) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 font-sans">
      <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm mb-6 inline-flex items-center transition-colors">
        ← Voltar para home
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 mb-8 text-zinc-500 dark:text-zinc-400 text-sm">
        {post.author && <Author name={post.author.name} avatarUrl={post.author.avatarUrl} />}
        {post.date && <span>• {post.date}</span>}
      </div>

      {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            unoptimized
          />
        </div>
      )}

      {post.tags && (
        <div className="flex gap-2 mb-8 flex-wrap">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tags: {post.tags.length}</p>
          {post.tags?.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="text-sm">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 font-medium">
          {post.description}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="whitespace-pre-wrap text-zinc-800 dark:text-zinc-200 leading-relaxed">
          
        </div>
      </div>
    </div>
  );
}

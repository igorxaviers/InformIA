import Link from 'next/dist/client/link';
import Image from 'next/image';
import type { IPostBlog } from '../../types/postblog';
import { notFound } from 'next/navigation';

// Simulação de busca de post (substitua por fetch real)
const mockPosts: IPostBlog[] = [
  {
    id: '1',
    title: 'Exemplo de Post',
    description: 'Descrição do post de exemplo.',
    publishedDate: '2025-11-11',
    slug: 'exemplo-de-post',
    imageUrl: 'https://placehold.co/600x300',
    author: { id: '1', name: 'Autor Exemplo', avatarUrl: 'https://placehold.co/40' },
    date: '2025-11-11',
    tags: [{ id: '1',  name: 'Next.js', slug: 'nextjs' }],
    content: "Este é o conteúdo detalhado do post de exemplo. Aqui você pode adicionar parágrafos, imagens, vídeos e outros elementos para enriquecer o artigo.",
  },
];

interface PostDetailPageProps {
  params: { slug: string };
}

export default async function PostDetailPage(props: PostDetailPageProps) {
  const { slug } = await props.params;
  const post = mockPosts[0];
  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <Image
        src={post.imageUrl || '/fallback-image.png'}
        overrideSrc={post.imageUrl || '/fallback-image.png'}
        alt={post.title}
        width={600}
        height={256}
        className="rounded mb-2 w-full h-64 object-cover"
        style={{ objectFit: 'cover', width: '100%', height: '16rem' }}
        priority
        unoptimized
      />
      <Link href={`/${post.slug}`} className="text-blue-500 text-xs hover:underline mb-4 block">
        <span>{post.title}</span>
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4 text-lg">{post.description}</p>
      <div className="flex gap-2 mb-8">
        {post.tags?.map((tag) => (
          <span key={tag.slug || tag.name} className="bg-gray-200 rounded px-2 py-1 text-xs">{tag.name}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        {post.author?.avatarUrl && (
          <Image
            src={post.author.avatarUrl}
            overrideSrc={post.author.avatarUrl}
            alt={post.author.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
            unoptimized
          />
        )}
        <span className="text-sm text-gray-600">Por {post.author?.name} • {post.date}</span>
      </div>
      <section>
        <p className="leading-relaxed text-lg">{post.content}</p>
      </section>
    </div>
  );
}

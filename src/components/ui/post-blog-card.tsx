import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Author } from "../postblog/author";
import { IPostBlogList } from "@/types/postblog";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

export function PostBlogCard({ title, description, slug, imageUrl, author, date, tags }: IPostBlogList) {
  return (
    <Link href={`/${slug}`}>
      <Card className="flex flex-col md:flex-row gap-4 p-4 md:p-6 w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900">
        {imageUrl && (
          <div className="shrink-0 w-full md:w-40 h-40 relative rounded-lg overflow-hidden">
            <Image 
              src='https://placehold.co/600x400'
              overrideSrc='https://placehold.co/600x400'
              alt={title} 
              className="object-cover"
              loading="lazy"
              fill
              unoptimized={true}
            />
          </div>
        )}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-base mb-2">{description}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            <div className="flex items-center gap-0.5">
              {author && <Author name={author.name} avatarUrl={author.avatarUrl} />}
              {author && date && <span>&nbsp;|&nbsp;</span>}
              {date && <span>{date}</span>}
            </div>
            <div className="flex gap-2">
              {tags && <Badge variant={'outline'}>{tags[0].name}</Badge>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

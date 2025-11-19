import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <Card className="flex flex-col md:flex-row gap-4 p-4 md:p-6 w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900">
      <div className="shrink-0 w-full md:w-40 h-40 relative rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
             <Skeleton className="h-6 w-6 rounded-full" />
             <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </Card>
  );
}

export function PostListSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}

export function CategoryBadgeSkeleton() {
  return <Skeleton className="h-7 w-24 rounded-full" />;
}

export function CategoryListSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <CategoryBadgeSkeleton />
      <CategoryBadgeSkeleton />
      <CategoryBadgeSkeleton />
      <CategoryBadgeSkeleton />
      <CategoryBadgeSkeleton />
    </div>
  );
}

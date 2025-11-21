import { Suspense } from "react";
import { SearchInput } from "@/components/home/SearchInput";
import { CategoryList } from "@/components/home/CategoryList";
import { PostList } from "@/components/home/PostList";
import { CategoryListSkeleton, PostListSkeleton } from "@/components/ui/skeletons";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-6 md:px-16 bg-white dark:bg-black sm:items-start">
        <section className="w-full">
          <h1 className="max-w-xs text-6xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-4 md:mb-6">
            InformIA
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-4 md:mb-8">
            Informe-se com a sua fonte confiável impulsionada por IA.
          </p>
          <SearchInput />
        </section>
        <section className="w-full">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 md:mb-4">Principais tópicos da semana:</p>
          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList />
          </Suspense>
        </section>
        <section className="w-full mt-10 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Últimos posts</h2>
          <Suspense key={query} fallback={<PostListSkeleton />}>
            <PostList search={query} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

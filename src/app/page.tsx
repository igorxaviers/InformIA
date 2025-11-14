import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react";
import { PostBlogCard } from "@/components/ui/post-blog-card";
import { IPostBlogList } from "@/types/postblog";

export default function Home() {
  const mainTopics = [
    "Inteligência Artificial",
    "Tecnologia",
    "Ciência",
    "Programação",
    "Inovação",
  ];

  const examplePosts: IPostBlogList[] = [
    {
      id: '1',
      title: "Como a IA está mudando o mundo",
      description: "Descubra como a inteligência artificial está impactando diferentes setores e o que esperar do futuro.",
      imageUrl: "/ai-world.jpg",
      slug: "como-a-ia-esta-mudando-o-mundo",
      author: {id: '1', name: "João Silva", avatarUrl: "https://placehold.co/24x24" },
      date: "10 Nov 2025",
      tags: [{ id: '1', name: "IA" }, { id: '2', name: "Tecnologia" }, { id: '3', name: "Futuro" }],
    },
    {
      id: '2',
      title: "5 tendências em tecnologia para 2026",
      description: "Fique por dentro das principais tendências tecnológicas que vão dominar o próximo ano.",
      imageUrl: "/tech-trends.jpg",
      author: { id: '1', name: "Maria Souza" },
      date: "9 Nov 2025",
      tags: [{ id: '1', name: "Tecnologia" }, { id: '2', name: "Tendências" }, { id: '3', name: "Futuro" }],
    },
    {
      id: '3',
      title: "Programação para iniciantes: por onde começar?",
      description: "Dicas essenciais para quem quer dar os primeiros passos no mundo da programação.",
      imageUrl: "/programming.jpg",
      author: { id: '1', name: "Carlos Lima" },
      date: "8 Nov 2025",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-6 md:px-16 bg-white dark:bg-black sm:items-start">
        <section className="w-full">
          <h1 className="max-w-xs text-6xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-4 md:mb-6">
            InformIA
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-4 md:mb-8">
            Informe-se com a sua fonte confiável impulsionada por IA.
          </p>
          <InputGroup className="mb-8 md:mb-12">
            <InputGroupInput placeholder="Pesquise..." id="search-input" />
            <InputGroupAddon>
              <SearchIcon size={'sm'}/>
            </InputGroupAddon>
          </InputGroup>
        </section>
        <section className="w-full">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 md:mb-4">Principais tópicos da semana:</p>
          <div className="flex flex-wrap gap-2">
            {mainTopics.map((topic) => (
              <Badge
                key={topic}
                className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </section>
        <section className="w-full mt-10 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Últimos posts</h2>
          {examplePosts.map((post, idx) => (
            <PostBlogCard key={idx} {...post} />
          ))}
        </section>
      </main>
    </div>
  );
}

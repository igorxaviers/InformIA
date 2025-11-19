import { getCategories } from "@/services/categories";
import { Badge } from "@/components/ui/badge";

export async function CategoryList() {
  try {
    const categories = await getCategories();

    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((topic) => (
          <Badge
            key={topic}
            className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
          >
            {topic}
          </Badge>
        ))}
      </div>
    );
  } catch (error: any) {
    return <div className="text-red-500">Error loading categories: {error.message}</div>;
  }
}

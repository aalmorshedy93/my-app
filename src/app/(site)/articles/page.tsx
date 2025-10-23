
import { Article } from '@/types/article';
import { ArticleItem } from '../_components/article/articleItem';

export default async function ArticlesPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles.');
  }

  const data: Article[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-sky-700">📰 Latest Articles</h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.slice(0, 12).map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

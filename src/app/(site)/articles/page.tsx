import SearchInput from '@/components/ui/SearchInput';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Article } from '@/types/article';
import { ArticleItem } from '../_components/article/articleItem';

type Props = {
  searchParams?: { q?: string; page?: string };
};

export default async function ArticlesPage({ searchParams }: Props) {
  // `searchParams` can be a dynamic API in some Next.js versions — await it to avoid runtime warnings
  const sp = (await Promise.resolve(searchParams)) ?? {};
  const q = sp.q ?? '';
  const page = Math.max(1, parseInt(sp.page ?? '1', 10) || 1);

  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles.');
  }

  const data: Article[] = await res.json();

  const filtered = q
    ? data.filter(
        (a) =>
          a.title.toLowerCase().includes(q.toLowerCase()) ||
          a.body.toLowerCase().includes(q.toLowerCase())
      )
    : data;

  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (p > 1) params.set('page', String(p));
    const s = params.toString();
    return `/articles${s ? `?${s}` : ''}`;
  };

  // simple page range (show all pages if small)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-sky-700">
          📰 Latest Articles
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Browse the latest posts. Use search to filter articles by title or content.
        </p>

        <div className="mx-auto max-w-3xl">
          <SearchInput defaultValue={q} placeholder="Search articles..." />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={buildHref(Math.max(1, page - 1))} />
                </PaginationItem>

                {pages.map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink href={buildHref(p)} isActive={p === page}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext href={buildHref(Math.min(totalPages, page + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}

// app/articles/[id]/page.tsx
import { Article } from '@/types/article';
import Link from 'next/link';
import ArticleComments from '../../_components/article/articleCommens';

interface SingleArticlePageProps {
  params: { id: string };
}

export const revalidate = 60;

export default async function ArticleDetails({ params }: SingleArticlePageProps) {
  const { id } = params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  const article: Article = await response.json();

  if (!article?.id) return <p className="text-center text-red-600 py-10">Article not found</p>;

  return (
    <>
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-sky-700 mb-4">{article.title}</h1>

          <p className="text-gray-800 leading-relaxed text-lg mb-6">{article.body}</p>

          <Link
            href="/articles"
            className="inline-block px-6 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>

      {/* Comments client component (loads on client side, uses Zustand) */}
      <ArticleComments />
    </>
  );
}

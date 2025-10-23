import { Article } from '@/types/article';
import Link from 'next/link';

interface SingleArticlePageProps {
  params: Promise<{ id: string }>;
}

// ✅ توليد الصفحات الستاتيك مسبقًا لأول 10 مقالات مثلاً
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const articles: Article[] = await res.json();

  // نولّد بس أول 10 صفحات كبداية
  return articles.slice(0, 10).map((article) => ({
    id: article.id.toString(),
  }));
}

// ✅ إعادة التحقق كل 60 ثانية (ISR)
export const revalidate = 60;

export default async function ArticleDetails({ params }: SingleArticlePageProps) {
  const { id } = await params;

  // 🔍 تحقق من صحة الـ ID
  if (isNaN(Number(id))) {
    throw new Error('Invalid article ID.');
  }

  // 🧠 جلب تفاصيل المقال المحدد
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch article details.');
  }

  const article: Article = await response.json();

  // 🔎 تحقق لو المقال مش موجود
  if (!article?.id) {
    throw new Error('Article not found.');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">📰 {article.title}</h1>

        <p className="text-gray-700 leading-relaxed text-lg mb-8">{article.body}</p>

        <div className="flex justify-center">
          <Link
            href="/articles"
            className="px-6 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

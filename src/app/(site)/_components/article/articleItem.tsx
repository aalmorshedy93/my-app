import { Article } from '@/types/article';
import Link from 'next/link';

type prpoArticle = {
  article: Article;
};

export const ArticleItem = ({ article }: prpoArticle) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group">
        <div className="h-40 bg-gradient-to-r from-sky-400 to-blue-500 flex justify-center items-center text-white text-4xl font-bold">
          #{article.id}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors duration-200 line-clamp-1">
            {article.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{article.body}</p>

          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <Link
              href={`/articles/${article.id}`}
              className="text-sky-600 font-medium hover:text-sky-800 transition-colors duration-200"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

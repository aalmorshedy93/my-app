'use client';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { useCommentsStore } from '@/store/commentsStore';

export default function ArticleComments() {
  const comments = useCommentsStore((state) => state.comments);

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-12 bg-white shadow-sm border border-gray-200 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">💬 Comments</h2>

      {/* Comment Form */}
      <CommentForm />

      {/* List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => <CommentItem key={c.id} comment={c} />)
        )}
      </div>
    </div>
  );
}

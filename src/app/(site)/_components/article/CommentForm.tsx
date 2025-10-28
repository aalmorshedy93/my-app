'use client';

import { useCommentsStore } from '@/store/commentsStore';
import type { ArticleComment } from '@/types/comment';
import { useState } from 'react';

export default function CommentForm() {
  const addComment = useCommentsStore((state) => state.addComment);

  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    setSubmitting(true);

    const newComment: ArticleComment = {
      id: String(Date.now()),
      author: author.trim() || 'Anonymous',
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };

    addComment(newComment);

    // reset form
    setAuthor('');
    setBody('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Add a Comment</h3>

      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-sky-300 focus:border-sky-500 outline-none transition"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment..."
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-sky-300 focus:border-sky-500 outline-none transition"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!body.trim() || submitting}
          className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 disabled:opacity-40 transition"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
}

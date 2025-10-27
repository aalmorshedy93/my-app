'use client';

import { Input } from '@/components/ui/input';
import type { Comment } from '@/types/comment';
import React, { useState } from 'react';

type Props = {
  /** Called when form is submitted with the new comment (not persisted) */
  onSubmit?: (comment: Comment) => void;
  /** Optional default author name */
  defaultAuthor?: string;
};

export default function CommentForm({ onSubmit, defaultAuthor = '' }: Props) {
  const [author, setAuthor] = useState(defaultAuthor);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);

    const comment: Comment = {
      id: String(Date.now()),
      author: author.trim() || 'Anonymous',
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };

    // call callback for parent to handle (e.g. add to local list)
    if (onSubmit) {
      try {
        await Promise.resolve(onSubmit(comment));
      } catch {
        // swallow — parent can show error
      }
    }

    setBody('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label className="sr-only">Name</label>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="sm:col-span-1"
        />

        <label className="sr-only">Comment</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="sm:col-span-2 w-full rounded-md border border-input px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="submit"
          disabled={submitting || !body.trim()}
          className="px-3 py-2 bg-sky-600 text-white rounded disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Add comment'}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useCommentsStore } from '@/store/commentsStore';
import type { ArticleComment } from '@/types/comment';
import { useState } from 'react';

export default function CommentItem({ comment }: { comment: ArticleComment }) {
  const { deleteComment, updateComment } = useCommentsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(comment.body);

  const initials = comment.author
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const date = new Date(comment.createdAt).toLocaleString();

  const handleSave = () => {
    updateComment(comment.id, body);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Avatar */}
      <div className="min-w-10 min-h-10 flex items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold">
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <strong className="text-gray-800">{comment.author}</strong>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        {/* Comment Text OR Edit Mode */}
        {!isEditing ? (
          <p className="mt-2 text-gray-700 leading-relaxed">{comment.body}</p>
        ) : (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded-lg p-2 mt-2 text-gray-800 focus:ring-sky-300 focus:border-sky-500 outline-none"
            rows={3}
          />
        )}

        {/* Actions */}
        <div className="mt-3 flex gap-3 text-sm">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="text-sky-600 hover:underline">
                Edit
              </button>

              <button
                onClick={() => deleteComment(comment.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} className="text-green-600 hover:underline">
                Save
              </button>

              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:underline">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { ArticleComment } from '@/types/comment';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommentsStore {
  comments: ArticleComment[];
  addComment: (comment: ArticleComment) => void;
  deleteComment: (id: string) => void;
  updateComment: (id: string, updatedBody: string) => void;
}

export const useCommentsStore = create(
  persist<CommentsStore>(
    (set) => ({
      comments: [],
      addComment: (comment: ArticleComment) =>
        set((state) => ({
          comments: [comment, ...state.comments],
        })),
      deleteComment: (id: string) =>
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== id),
        })),
      updateComment: (id: string, updatedBody: string) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === id ? { ...comment, body: updatedBody } : comment
          ),
        })),
    }),
    {
      name: 'comments-storage', // name of the item in the storage
    }
  )
);

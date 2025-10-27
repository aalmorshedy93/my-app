import type { Comment } from '@/types/comment';

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  const date = new Date(comment.createdAt).toLocaleString();

  const initials = comment.author
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="flex gap-3 p-3 rounded-md border border-gray-100 bg-white dark:bg-gray-800">
      <div className="flex-none h-10 w-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-semibold">
        {initials}
      </div>

      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-sm font-medium">{comment.author}</h4>
          <time className="text-xs text-muted-foreground">{date}</time>
        </div>

        <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{comment.body}</p>
      </div>
    </article>
  );
}

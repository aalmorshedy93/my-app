import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(2).max(20),
  body: z.string().min(1).max(200),
});

export const articleIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number'),
});

export const updateArticleSchema = z.object({
  title: z.string().min(2).max(20).optional(),
  body: z.string().min(1).max(200).optional(),
});

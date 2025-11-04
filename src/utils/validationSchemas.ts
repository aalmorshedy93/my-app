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

export const registerUserSchema = z.object({
  email: z.string().trim().pipe(z.string().email('Please enter a valid email address')),

  userName: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username cannot exceed 15 characters'),

  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name cannot exceed 30 characters'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),

  isAdmin: z.boolean().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().trim().pipe(z.string().email('Please enter a valid email address')),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});

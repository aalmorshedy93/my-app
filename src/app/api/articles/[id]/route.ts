import { prisma } from '@/lib/prisma';
import { articleIdSchema, updateArticleSchema } from '@/utils/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// GET Article By ID
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = articleIdSchema.parse(params);
    const article = await prisma.article.findUnique({ where: { id: Number(id) } });

    if (!article) return NextResponse.json({ error: 'Article Not Found' }, { status: 404 });

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// UPDATE Article
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = articleIdSchema.parse(params);
    const body = await request.json();
    const validated = updateArticleSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          errors: validated.error.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const existing = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ error: 'Article Not Found' }, { status: 404 });

    const updated = await prisma.article.update({
      where: { id: Number(id) },
      data: validated.data,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE Article
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = articleIdSchema.parse(params);

    const existing = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ error: 'Article Not Found' }, { status: 404 });

    await prisma.article.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: 'Article Deleted Successfully' });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

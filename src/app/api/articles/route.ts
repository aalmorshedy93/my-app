import prisma from '@/utils/db';
import { createArticleSchema } from '@/utils/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @method GET
 * @route ~/api/articles
 * @description Fetch all articles
 * @access Public
 */
export async function GET(_request: NextRequest) {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create a new article
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createArticleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          errors: parsed.error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const newArticle = await prisma.article.create({
      data: parsed.data, // title & body directly
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

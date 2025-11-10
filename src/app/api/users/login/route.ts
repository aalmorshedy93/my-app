import { prisma } from '@/lib/prisma';
import { LoginUserDTO } from '@/utils/dtos';
import { loginUserSchema } from '@/utils/validationSchemas';
import { generateToken } from '@/utils/generateToken';
import argon2 from 'argon2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDTO;

    const validation = loginUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          errors: validation.error.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await argon2.verify(user.password, password))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await generateToken(user);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName,
          name: user.name,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

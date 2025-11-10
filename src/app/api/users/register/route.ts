import { prisma } from '@/lib/prisma';
import { CreateUser } from '@/utils/dtos';
import { registerUserSchema } from '@/utils/validationSchemas';
import { generateToken } from '@/utils/generateToken';
import argon2 from 'argon2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateUser;

    const validation = registerUserSchema.safeParse(body);
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

    const { email, userName, password, name, isAdmin } = validation.data;

    // ✅ Check Email OR Username
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { userName }] },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            existingUser.email === email
              ? 'User with this email already exists'
              : 'Username is already taken',
        },
        { status: 409 }
      );
    }

    // ✅ Hash Password
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const createdUser = await prisma.user.create({
      data: { email, userName, name, isAdmin, password: hashedPassword },
      select: {
        id: true,
        email: true,
        userName: true,
        name: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    // ✅ Create token
    const token = await generateToken(createdUser);

    return NextResponse.json(
      {
        user: createdUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

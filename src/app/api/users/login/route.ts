import { prisma } from '@/lib/prisma';
import { LoginUserDTO } from '@/utils/dtos';
import { generateToken } from '@/utils/generateToken';
import { loginUserSchema } from '@/utils/validationSchemas';
import argon2 from 'argon2';
import { NextRequest, NextResponse } from 'next/server';

/** * @method POST
 * @route ~/api/users/login
 * @description Login a user
 * @access Public
 */
export async function POST(_request: NextRequest) {
  try {
    const body = (await _request.json()) as LoginUserDTO;
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
    const user = await prisma.user.findUnique({
      where: { email: validation.data.email },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const isPasswordValid = await argon2.verify(user.password, validation.data.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid  password' }, { status: 401 });
    }

    // ✅ Create JWT
    const token = (await generateToken(user)) as string;

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

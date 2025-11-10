import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userIdInToken = Number(request.headers.get('x-user-id'));
    const isAdmin = request.headers.get('x-user-admin') === 'true';
    const targetId = Number(params.id);

    if (Number.isNaN(targetId)) {
      return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });
    }

    if (userIdInToken !== targetId && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id: targetId } });
    if (!user) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    await prisma.user.delete({ where: { id: targetId } });

    return NextResponse.json({ message: 'Account Deleted Successfully' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

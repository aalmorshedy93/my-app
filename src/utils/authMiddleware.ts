import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/api/users/delete', '/api/users/me'];

export default async function authMiddleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  if (!isProtected) return null;

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No Token' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    request.headers.set('x-user-id', payload.sub || '');
    request.headers.set('x-user-admin', String(payload.isAdmin || false));

    return null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized - Invalid Token' }, { status: 401 });
  }
}

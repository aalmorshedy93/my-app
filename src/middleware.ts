import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import authMiddleware from './utils/authMiddleware';
import intlMiddleware from './utils/intlMiddleware';

export async function middleware(request: NextRequest) {
  const intlResponse = await intlMiddleware(request);
  if (intlResponse) return intlResponse;

  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/users/:path*', // حماية APIs محددة
    '/((?!_next/static|_next/image|favicon.ico).*)', // كل الصفحات العادية لـ intl
  ],
};

import { NextRequest } from 'next/server';

export default async function intlMiddleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const lang = url.searchParams.get('lang') || 'en';

  // ضع اللغة في headers
  request.headers.set('x-lang', lang);

  return null; // تابع الطلب
}

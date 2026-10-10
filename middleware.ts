import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('better-auth.session_token');
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = pathname.startsWith('/product/') || pathname.startsWith('/profile');

  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL('/signin', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*', '/profile/:path*'],
};
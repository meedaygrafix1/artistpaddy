import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Paths that don't require authentication
    const publicPaths = ['/', '/signin', '/signup', '/api/auth/signin', '/api/auth/signup', '/api/auth/logout'];


    // Static files and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // images, logo.png, etc.
    ) {
        return NextResponse.next();
    }

    // If path is public, verify token (optional: redirect logged-in users away from signin)
    if (publicPaths.includes(pathname)) {
        // Only redirect from signin/signup pages. Allow landing page access.
        if (token && (pathname === '/signin' || pathname === '/signup')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Check if token exists
    if (!token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // Verify token
    const payload = await verifyJWT(token);
    if (!payload) {
        // Invalid token
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

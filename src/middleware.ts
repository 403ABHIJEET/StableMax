import { NextRequest, NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt';


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl;
    if (!token && url.pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile',
    ],
}
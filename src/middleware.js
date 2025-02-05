import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
    const cookieStore = await cookies(); // Awaiting cookies() as per the error

    const token = cookieStore.get('next-auth.session-token') || cookieStore.get('__Secure-next-auth.session-token');

    if (!token) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/checkout', '/admin', '/myBookings'],
};

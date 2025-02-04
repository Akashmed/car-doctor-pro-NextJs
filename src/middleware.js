import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
    // In production, the token is stored as "__Secure-next-auth.session-token"
    const token = await cookies(request).get('next-auth.session-token') || await cookies(request).get('__Secure-next-auth.session-token');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/checkout', '/admin', '/myBookings']
};

import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl

        if (pathname.startsWith("/dashboard/sa") && token?.role !== Role.SA && token?.role !== Role.TECH && token?.role !== Role.LECTURER) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        if (pathname.startsWith("/dashboard/pr") && token?.role !== Role.PR && token?.role !== Role.TECH) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*"]
}
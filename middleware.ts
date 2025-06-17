import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define the paths that should be public
const publicPaths = ["/sign-in", "/forgot-password"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths without authentication
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Retrieve the token (authenticated user)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token and path is protected, redirect to login
  if (!token) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|images).*)"],
};
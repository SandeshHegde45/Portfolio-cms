import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, getExpectedSessionValue } from "@/lib/auth/session";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
  const isAuthenticated = sessionCookie?.value === getExpectedSessionValue();

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};

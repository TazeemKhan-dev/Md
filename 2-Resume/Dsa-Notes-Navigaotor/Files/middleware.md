import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔓 Always allow these
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout" ||
    pathname === "/api/admin/session"
  ) {
    return NextResponse.next();
  }

  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  const isJournal =
    pathname.startsWith("/journal") || pathname.startsWith("/api/journal");

  // Only protect admin + journal
  if (!isAdmin && !isJournal) {
    return NextResponse.next();
  }

  const sessionId = req.cookies.get("admin-auth")?.value;

  if (!sessionId) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}



export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/journal/:path*",
    "/api/journal/:path*",
  ],
};



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { KEYSTATIC_SESSION_COOKIE } from "@/app/api/keystatic-login/route";

/* Password-gates /keystatic and its API route (/api/keystatic) via a
   session cookie set at /keystatic-login (see that page + its API route).
   Storage is local (content/ is committed to git, no GitHub/Cloud login),
   so without this anyone who can reach the deployed site could open
   /keystatic and edit content — there is no other auth layer. Set
   KEYSTATIC_ADMIN_PASSWORD in the environment to enable; if it's missing,
   the admin routes fail closed (503) instead of opening. */

export function middleware(request: NextRequest) {
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD?.trim();
  if (!password) {
    return new NextResponse("Keystatic admin is not configured: set KEYSTATIC_ADMIN_PASSWORD.", { status: 503 });
  }

  const session = request.cookies.get(KEYSTATIC_SESSION_COOKIE)?.value;
  if (session === password) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/keystatic-login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};

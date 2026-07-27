import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Password-gates /keystatic and its API route (/api/keystatic) via HTTP
   Basic Auth. Storage is local (content/ is committed to git, no
   GitHub/Cloud login), so without this anyone who can reach the deployed
   site could open /keystatic and edit content — there is no other auth
   layer. Set KEYSTATIC_ADMIN_PASSWORD in the environment to enable; if it's
   missing, the admin routes fail closed (503) instead of opening. */

const REALM = 'Basic realm="Keystatic Admin"';

export function middleware(request: NextRequest) {
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD?.trim();
  if (!password) {
    return new NextResponse("Keystatic admin is not configured: set KEYSTATIC_ADMIN_PASSWORD.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    // Only the password matters — the username field is ignored (it isn't
    // shown to the browser, and different browsers/autofill send different
    // things there), so extract just the part after the first ":" rather
    // than requiring an exact "admin:<password>" match.
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
    const providedPassword = decoded.slice(decoded.indexOf(":") + 1);
    if (providedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};

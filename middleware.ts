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
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Keystatic admin is not configured: set KEYSTATIC_ADMIN_PASSWORD.", { status: 503 });
  }

  const expected = "Basic " + Buffer.from(`admin:${password}`).toString("base64");
  const provided = request.headers.get("authorization");

  if (provided === expected) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};

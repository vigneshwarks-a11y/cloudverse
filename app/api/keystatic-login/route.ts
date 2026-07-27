import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { KEYSTATIC_SESSION_COOKIE } from "@/lib/keystaticAuth";

export async function POST(request: NextRequest) {
  const configured = process.env.KEYSTATIC_ADMIN_PASSWORD?.trim();
  if (!configured) {
    return NextResponse.json({ error: "Keystatic admin is not configured." }, { status: 503 });
  }

  const { password } = await request.json().catch(() => ({ password: undefined }));
  if (typeof password !== "string" || password !== configured) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // The cookie value IS the password (not a derived token) — this is a
  // single shared-password gate, not per-user auth, so there's no extra
  // security lost versus the HTTP Basic Auth this replaced (which also
  // sends the plain password on every request). httpOnly keeps it out of
  // reach of any JS running on the page.
  res.cookies.set(KEYSTATIC_SESSION_COOKIE, configured, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

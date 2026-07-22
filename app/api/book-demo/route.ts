import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface BookDemoPayload {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  role: string;
  estimatedSpend?: string;
  focus?: string;
}

const REQUIRED: (keyof BookDemoPayload)[] = ["firstName", "lastName", "workEmail", "company", "role"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Partial<BookDemoPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  for (const field of REQUIRED) {
    if (!body[field] || !String(body[field]).trim()) {
      return NextResponse.json({ error: `Missing required field: ${field}.` }, { status: 400 });
    }
  }
  if (!EMAIL_RE.test(body.workEmail!)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  // TODO(lead-routing): this endpoint accepts and validates the demo-request
  // form but does not yet deliver it anywhere. Wire this to the real
  // destination before launch — e.g. a HubSpot/Salesforce lead-create API
  // call, an outbound email via a transactional provider, or a CRM webhook.
  // `body.role` is the persona field meant to route the follow-up (see
  // docs/WEBSITE-IMPLEMENTATION.md §11.12) — use it to pick the queue/owner.
  console.log("[book-demo] new request (not yet delivered anywhere):", body);

  return NextResponse.json({ ok: true });
}

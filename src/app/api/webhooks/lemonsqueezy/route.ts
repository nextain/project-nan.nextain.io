import { NextResponse } from "next/server";
import { verifyLemonSignature } from "@/lib/lemonsqueezy";

const HANDLED_EVENTS = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
]);

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  const signature = request.headers.get("x-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await request.text();
  const valid = verifyLemonSignature({ rawBody, signature, secret });
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    meta?: { event_name?: string; custom_data?: Record<string, string> };
    data?: { id?: string; attributes?: Record<string, unknown> };
  };

  const eventName = payload.meta?.event_name ?? "unknown";
  if (!HANDLED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: true, ignored: eventName });
  }

  // TODO: sync subscription state into gateway user plan (FREE/BASIC)
  // Expected source user id: payload.meta?.custom_data?.user_id
  return NextResponse.json({ ok: true, event: eventName });
}

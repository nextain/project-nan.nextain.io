import { NextRequest, NextResponse } from "next/server";
import { getUser, updateUser } from "@/lib/gateway-client";

/**
 * Desktop config sync API.
 * Authenticates via X-Desktop-Key + X-User-Id headers (desktop key issued at login).
 * Uses master key internally to read/write user metadata.
 *
 * GET  /api/gateway/config — Fetch nan_config from user metadata
 * PATCH /api/gateway/config — Update nan_config in user metadata
 */

const ALLOWED_ORIGINS = [
  "http://localhost:1420",
  "https://tauri.localhost",
  "tauri://localhost",
];

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Desktop-Key, X-User-Id",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

function extractHeaders(req: NextRequest): { key: string; userId: string } | null {
  const key = req.headers.get("x-desktop-key");
  const userId = req.headers.get("x-user-id");
  if (!key || !userId) return null;
  return { key, userId };
}

export async function GET(req: NextRequest) {
  const auth = extractHeaders(req);
  if (!auth) {
    return NextResponse.json({ error: "Missing auth headers" }, { status: 401, headers: corsHeaders(req) });
  }

  try {
    const user = await getUser(auth.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders(req) });
    }
    const nanConfig = (user.metadata as Record<string, unknown>)?.nan_config ?? null;
    return NextResponse.json({ config: nanConfig }, { headers: corsHeaders(req) });
  } catch {
    return NextResponse.json({ error: "Gateway error" }, { status: 502, headers: corsHeaders(req) });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = extractHeaders(req);
  if (!auth) {
    return NextResponse.json({ error: "Missing auth headers" }, { status: 401, headers: corsHeaders(req) });
  }

  try {
    const body = (await req.json()) as { config: Record<string, unknown> };
    if (!body.config || typeof body.config !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400, headers: corsHeaders(req) });
    }

    // Merge with existing metadata to avoid overwriting other fields
    const existing = await getUser(auth.userId);
    const existingMeta = (existing?.metadata ?? {}) as Record<string, unknown>;

    await updateUser(auth.userId, {
      metadata: {
        ...existingMeta,
        nan_config: body.config,
      },
    });

    return NextResponse.json({ ok: true }, { headers: corsHeaders(req) });
  } catch {
    return NextResponse.json({ error: "Gateway error" }, { status: 502, headers: corsHeaders(req) });
  }
}

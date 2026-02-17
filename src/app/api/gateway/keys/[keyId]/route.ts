import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isKeyOwnedByUser, revokeKey, updateKey } from "@/lib/gateway-client";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ keyId: string }> },
) {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { keyId } = await context.params;

  try {
    const owned = await isKeyOwnedByUser(session.gwUserId, keyId);
    if (!owned) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await revokeKey(keyId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ keyId: string }> },
) {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { keyId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  try {
    const owned = await isKeyOwnedByUser(session.gwUserId, keyId);
    if (!owned) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const key = await updateKey(keyId, body);
    return NextResponse.json(key);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

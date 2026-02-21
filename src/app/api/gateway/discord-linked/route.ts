import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { lookupUser } from "@/lib/gateway-client";

export async function GET() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user?.email ?? undefined;
  if (!email) {
    return NextResponse.json({ discordUserId: null });
  }

  try {
    const linked = await lookupUser("discord", { email });
    return NextResponse.json({
      discordUserId: linked?.provider_account_id ?? null,
      linkedUserId: linked?.user_id ?? null,
      currentUserId: session.gwUserId,
      linked: linked?.user_id === session.gwUserId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}


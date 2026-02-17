import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getModelPricing } from "@/lib/gateway-client";

export async function GET() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pricing = await getModelPricing();
    return NextResponse.json(pricing);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

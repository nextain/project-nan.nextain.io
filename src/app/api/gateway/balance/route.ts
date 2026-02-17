import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBalance, getUser } from "@/lib/gateway-client";

export async function GET() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [balanceData, user] = await Promise.all([
      getBalance(session.gwUserId),
      getUser(session.gwUserId),
    ]);
    const credits = balanceData.balance / 100_000; // micro-dollars → credits
    return NextResponse.json({
      userId: balanceData.userId,
      credits,
      spend: user?.spend ?? 0,
      blocked: user?.blocked ?? false,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 },
    );
  }
}

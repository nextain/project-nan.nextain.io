import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBalance, getUser, getUserUsage } from "@/lib/gateway-client";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BarChart3, ScrollText, Key, CreditCard } from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  const dict = await getDictionary(lang as Locale);

  let user = null;
  let credits = 0;
  let usage: Awaited<ReturnType<typeof getUserUsage>> = [];

  try {
    const [balanceData, userResult, usageResult] = await Promise.all([
      getBalance(session.gwUserId),
      getUser(session.gwUserId),
      getUserUsage(session.gwUserId, 0, 20),
    ]);
    credits = balanceData.balance / 100_000; // micro-dollars → credits
    user = userResult;
    usage = usageResult;
  } catch {
    // Gateway not available — show empty state
  }

  const totalTokens = usage.reduce((sum, log) => sum + (log.total_tokens ?? 0), 0);
  const totalCost = usage.reduce((sum, log) => sum + (log.cost ?? 0), 0);

  const quickLinks = [
    { href: `/${lang}/usage`, label: dict.sidebar.usage, icon: BarChart3 },
    { href: `/${lang}/logs`, label: dict.sidebar.logs, icon: ScrollText },
    { href: `/${lang}/keys`, label: dict.sidebar.keys, icon: Key },
    { href: `/${lang}/billing`, label: dict.sidebar.billing, icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">{dict.dashboard.title}</h1>

      {/* Credit Balance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {dict.dashboard.creditBalance}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {credits.toFixed(1)}
          </p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{dict.dashboard.totalRequests}</p>
            <p className="text-2xl font-bold">{usage.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{dict.dashboard.totalTokens}</p>
            <p className="text-2xl font-bold">{totalTokens.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{dict.dashboard.totalSpend}</p>
            <p className="text-2xl font-bold">${totalCost.toFixed(4)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{dict.dashboard.currentPeriod}</p>
            <Badge variant="secondary">
              {user?.blocked ? dict.dashboard.statusBlocked : dict.dashboard.statusActive}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{dict.dashboard.quickLinks}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-md border p-3 text-sm transition-colors hover:bg-muted"
              >
                <link.icon className="h-4 w-4 text-muted-foreground" />
                {link.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

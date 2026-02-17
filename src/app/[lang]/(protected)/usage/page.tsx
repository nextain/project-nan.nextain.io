import { auth } from "@/lib/auth";
import { getUserUsage } from "@/lib/gateway-client";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { RequestsChart, type UsageChartPoint } from "@/components/usage/requests-chart";
import { TokensChart } from "@/components/usage/tokens-chart";
import { SpendChart } from "@/components/usage/spend-chart";

type DailyPoint = {
  date: string;
  requests: number;
  tokens: number;
  spend: number;
};

function buildDailySeries(
  usage: Awaited<ReturnType<typeof getUserUsage>>,
  days: number,
): DailyPoint[] {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  const map = new Map<string, DailyPoint>();
  for (let i = 0; i < days; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, { date: key, requests: 0, tokens: 0, spend: 0 });
  }

  for (const log of usage) {
    const ts = new Date(log.timestamp);
    if (Number.isNaN(ts.getTime()) || ts < start) continue;

    const key = ts.toISOString().slice(0, 10);
    const row = map.get(key);
    if (!row) continue;

    row.requests += 1;
    row.tokens += log.total_tokens ?? 0;
    row.spend += log.cost ?? 0;
  }

  return Array.from(map.values());
}

export default async function UsagePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ period?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  const { period: periodParam } = await searchParams;
  const period = ["7", "30", "90"].includes(periodParam ?? "")
    ? Number(periodParam)
    : 30;

  let usage: Awaited<ReturnType<typeof getUserUsage>> = [];
  try {
    usage = await getUserUsage(session.gwUserId, 0, 500);
  } catch {
    usage = [];
  }

  const series = buildDailySeries(usage, period);
  const chartData: UsageChartPoint[] = series.map((point) => ({
    date: point.date,
    dateLabel: new Date(point.date).toLocaleDateString(
      lang === "ko" ? "ko-KR" : "en-US",
      { month: "short", day: "numeric" },
    ),
    requests: point.requests,
    tokens: point.tokens,
    spend: Number(point.spend.toFixed(6)),
  }));
  const totalRequests = series.reduce((sum, point) => sum + point.requests, 0);
  const totalTokens = series.reduce((sum, point) => sum + point.tokens, 0);
  const totalSpend = series.reduce((sum, point) => sum + point.spend, 0);

  const periods = [
    { value: 7, label: dict.usage.period.days7 },
    { value: 30, label: dict.usage.period.days30 },
    { value: 90, label: dict.usage.period.days90 },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">{dict.usage.title}</h1>
        <div className="flex items-center gap-2">
          {periods.map((p) => {
            const active = p.value === period;
            return (
              <Link
                key={p.value}
                href={`/${lang}/usage?period=${p.value}`}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.dashboard.totalRequests}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalRequests.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.dashboard.totalTokens}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTokens.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.dashboard.totalSpend}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalSpend.toFixed(4)}</p>
          </CardContent>
        </Card>
      </div>

      {series.every((point) => point.requests === 0) ? (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            {dict.usage.noData}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{dict.usage.requestsPerDay}</CardTitle>
            </CardHeader>
            <CardContent>
              <RequestsChart data={chartData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{dict.usage.tokensPerDay}</CardTitle>
            </CardHeader>
            <CardContent>
              <TokensChart data={chartData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{dict.usage.spendPerDay}</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendChart data={chartData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

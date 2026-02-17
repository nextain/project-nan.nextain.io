import { auth } from "@/lib/auth";
import { getUserUsage } from "@/lib/gateway-client";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { LogsTable } from "@/components/logs/logs-table";

const PAGE_SIZE = 20;

export default async function LogsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  const { page: pageParam } = await searchParams;
  const page = Number.isFinite(Number(pageParam))
    ? Math.max(1, Number(pageParam))
    : 1;
  const skip = (page - 1) * PAGE_SIZE;

  let logs: Awaited<ReturnType<typeof getUserUsage>> = [];
  try {
    logs = await getUserUsage(session.gwUserId, skip, PAGE_SIZE);
  } catch {
    logs = [];
  }

  const hasNext = logs.length === PAGE_SIZE;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold">{dict.logs.title}</h1>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            {dict.logs.noLogs}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <LogsTable logs={logs} dict={dict} lang={lang as Locale} />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Link
          href={`/${lang}/logs?page=${Math.max(1, page - 1)}`}
          className={`rounded-md border px-3 py-1.5 text-sm ${
            page === 1 ? "pointer-events-none opacity-40" : "hover:bg-muted"
          }`}
        >
          {dict.common.prev}
        </Link>
        <span className="text-sm text-muted-foreground">
          {dict.common.page} {page}
        </span>
        <Link
          href={`/${lang}/logs?page=${page + 1}`}
          className={`rounded-md border px-3 py-1.5 text-sm ${
            hasNext ? "hover:bg-muted" : "pointer-events-none opacity-40"
          }`}
        >
          {dict.common.next}
        </Link>
      </div>
    </div>
  );
}

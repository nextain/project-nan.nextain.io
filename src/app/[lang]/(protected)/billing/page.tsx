import { auth } from "@/lib/auth";
import { getBalance, getUser, getUserUsage, getModelPricing } from "@/lib/gateway-client";
import {
  buildLemonCheckoutUrl,
  isLemonSqueezyConfigured,
} from "@/lib/lemonsqueezy";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function BillingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  let credits = 0;
  let totalUsage = 0;
  let pricingCount = 0;

  try {
    const [balanceData, usage, pricing] = await Promise.all([
      getBalance(session.gwUserId),
      getUserUsage(session.gwUserId, 0, 100),
      getModelPricing(),
    ]);

    credits = balanceData.balance / 100_000; // micro-dollars → credits
    totalUsage = usage.reduce((sum, row) => sum + (row.cost ?? 0), 0);
    pricingCount = pricing.length;
  } catch {
    credits = 0;
    totalUsage = 0;
    pricingCount = 0;
  }

  const lemonReady = isLemonSqueezyConfigured();
  const checkoutUrl = lemonReady
    ? buildLemonCheckoutUrl({
        userId: session.gwUserId,
        email: session.user?.email,
        lang: lang as Locale,
      })
    : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold">{dict.billing.title}</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.billing.currentPlan}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{dict.billing.free}</p>
              <Badge variant="secondary">{dict.billing.currentBadge}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.billing.creditBalance}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{credits.toFixed(1)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {dict.billing.periodUsage}: ${totalUsage.toFixed(4)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{dict.billing.comparePlans}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{dict.billing.free}</h2>
                <Badge variant="outline">$0</Badge>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {dict.billing.freeFeatures.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{dict.billing.basic}</h2>
                <Badge>
                  {dict.home.pricing.basic.price}/{dict.home.pricing.basic.period}
                </Badge>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {dict.billing.basicFeatures.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>

              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  className="lemonsqueezy-button mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  {dict.billing.upgrade}
                </a>
              ) : (
                <button
                  type="button"
                  className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium"
                  disabled
                  title={dict.common.comingSoon}
                >
                  {dict.billing.upgrade} ({dict.common.comingSoon})
                </button>
              )}
            </article>
          </div>

          <div className="mt-5 rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p>{dict.billing.lemonNotice}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href={`/${lang}/terms`} className="underline hover:text-foreground">
                {dict.footer.links.terms}
              </Link>
              <Link href={`/${lang}/privacy`} className="underline hover:text-foreground">
                {dict.footer.links.privacy}
              </Link>
              <Link href={`/${lang}/refund`} className="underline hover:text-foreground">
                {dict.footer.links.refund}
              </Link>
              <Link href={`/${lang}/contact`} className="underline hover:text-foreground">
                {dict.footer.links.contact}
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            {dict.billing.pricingModelsSynced}: {pricingCount}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

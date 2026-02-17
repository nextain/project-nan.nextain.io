import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Check } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Pricing({ dict, lang }: { dict: Dictionary; lang: string }) {
  return (
    <section id="pricing" className="border-y border-border/40 bg-muted/25">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionReveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.home.pricing.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {dict.home.pricing.subtitle}
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-2">
          <SectionReveal>
            <article className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                {dict.home.pricing.free.name}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold">{dict.home.pricing.free.price}</span>
                <span className="pb-1 text-sm text-muted-foreground">
                  {dict.home.pricing.free.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {dict.home.pricing.free.description}
              </p>
              <ul className="mt-5 space-y-2">
                {dict.home.pricing.free.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${lang}/login`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
              >
                {dict.home.pricing.free.cta}
              </Link>
            </article>
          </SectionReveal>

          <SectionReveal delay={80}>
            <article className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-xs font-semibold tracking-wide text-primary">
                {dict.home.pricing.basic.name}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold">{dict.home.pricing.basic.price}</span>
                <span className="pb-1 text-sm text-muted-foreground">
                  / {dict.home.pricing.basic.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {dict.home.pricing.basic.description}
              </p>
              <ul className="mt-5 space-y-2">
                {dict.home.pricing.basic.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${lang}/billing`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {dict.home.pricing.basic.cta}
              </Link>
            </article>
          </SectionReveal>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {dict.home.pricing.policyNote}{" "}
          <Link href={`/${lang}/terms`} className="underline hover:text-foreground">
            {dict.footer.links.terms}
          </Link>{" "}
          ·{" "}
          <Link href={`/${lang}/privacy`} className="underline hover:text-foreground">
            {dict.footer.links.privacy}
          </Link>{" "}
          ·{" "}
          <Link href={`/${lang}/refund`} className="underline hover:text-foreground">
            {dict.footer.links.refund}
          </Link>
        </p>
      </div>
    </section>
  );
}

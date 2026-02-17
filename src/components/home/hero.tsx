import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Hero({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [line1, line2] = dict.home.hero.title.split("\n");

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.72_0.09_70/0.25),transparent_45%),radial-gradient(circle_at_bottom_left,oklch(0.62_0.08_150/0.22),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <SectionReveal>
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {dict.footer.brand} OS
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">{line1 ?? dict.home.hero.title}</span>
              {line2 ? <span className="block text-primary">{line2}</span> : null}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {dict.home.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/${lang}/login`}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {dict.home.hero.cta}
              </Link>
              <Link
                href={`/${lang}#pricing`}
                className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                {dict.home.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

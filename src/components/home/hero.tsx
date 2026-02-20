import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Hero({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [line1, line2] = dict.home.hero.title.split("\n");

  return (
    <section className="relative overflow-hidden border-b border-border/40 pb-12 pt-16 md:pb-20 md:pt-24">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glowing Animated Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px]" style={{ animation: 'float 15s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute right-[5%] top-[10%] -z-10 h-[700px] w-[700px] rounded-full bg-secondary/40 blur-[150px]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-accent/30 blur-[100px]" style={{ animation: 'float 18s ease-in-out infinite reverse' }} />

      <div className="relative mx-auto max-w-6xl px-4">
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

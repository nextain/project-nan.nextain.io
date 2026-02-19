import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { MANUAL_SLUGS, SLUG_TO_SECTION_KEY } from "@/lib/manual-docs";
import Link from "next/link";

export default async function ManualIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const sections = dict.manual.sections as Record<string, string>;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border border-border/50 bg-background p-4">
            <h2 className="mb-3 text-sm font-semibold">{dict.manual.toc}</h2>
            <ol className="space-y-1.5">
              {MANUAL_SLUGS.map((slug, i) => {
                const sectionKey = SLUG_TO_SECTION_KEY[slug];
                const label = sections[sectionKey] ?? slug;
                return (
                  <li key={slug}>
                    <Link
                      href={`/${lang}/manual/${slug}`}
                      className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border/60 text-xs">
                        {i + 1}
                      </span>
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        <section>
          <h1 className="text-3xl font-bold">{dict.manual.title}</h1>
          <p className="mt-2 text-muted-foreground">{dict.manual.subtitle}</p>
          <div className="mt-6">
            <Link
              href={`/${lang}/manual/${MANUAL_SLUGS[0]}`}
              className="inline-flex items-center rounded-lg border border-border/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              {lang === "ko" ? "첫 목차부터 보기" : "Start from first section"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

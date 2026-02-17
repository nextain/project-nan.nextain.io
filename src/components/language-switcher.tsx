"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/providers/locale-provider";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const dict = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: Locale) {
    // Replace /<currentLang>/... with /<newLocale>/...
    const segments = pathname.split("/");
    if (segments.length > 1 && SUPPORTED_LOCALES.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    }
    router.push(segments.join("/"));
  }

  const otherLocale: Locale = dict.locale === "ko" ? "en" : "ko";
  const label = otherLocale === "ko" ? "KO" : "EN";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 text-xs font-medium"
      onClick={() => switchLocale(otherLocale)}
    >
      {label}
    </Button>
  );
}

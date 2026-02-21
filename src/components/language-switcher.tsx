"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/providers/locale-provider";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  zh: "中文",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  es: "Español",
  ar: "العربية",
  hi: "हिन्दी",
  bn: "বাংলা",
  pt: "Português",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
};

export function LanguageSwitcher() {
  const dict = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    if (segments.length > 1 && SUPPORTED_LOCALES.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    }
    router.push(segments.join("/"));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0"
          title={LOCALE_LABELS[dict.locale]}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
        {SUPPORTED_LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className={dict.locale === l ? "bg-accent font-medium" : ""}
          >
            {LOCALE_LABELS[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


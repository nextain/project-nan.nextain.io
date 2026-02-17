import { readFile } from "fs/promises";
import path from "path";
import type { Locale } from "@/i18n/config";

export const LEGAL_SLUGS = ["terms", "privacy", "refund", "contact"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export async function readLegalDoc(lang: Locale, slug: LegalSlug): Promise<string> {
  const fullPath = path.join(process.cwd(), "src", "content", "legal", lang, `${slug}.md`);
  return readFile(fullPath, "utf-8");
}

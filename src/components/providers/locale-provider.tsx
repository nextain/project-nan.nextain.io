"use client";

import { createContext, useContext, useEffect } from "react";
import type { Dictionary } from "@/i18n/dictionaries/types";

const LocaleContext = createContext<Dictionary | null>(null);

export function LocaleProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = dictionary.locale;
  }, [dictionary.locale]);

  return (
    <LocaleContext.Provider value={dictionary}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useDictionary must be used within a LocaleProvider");
  }
  return ctx;
}

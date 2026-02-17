"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  ScrollText,
  Key,
  Settings,
  CreditCard,
} from "lucide-react";

export function MobileNav() {
  const dict = useDictionary();
  const lang = dict.locale;
  const pathname = usePathname();

  const items = [
    {
      href: `/${lang}/dashboard`,
      label: dict.sidebar.dashboard,
      icon: LayoutDashboard,
    },
    { href: `/${lang}/usage`, label: dict.sidebar.usage, icon: BarChart3 },
    { href: `/${lang}/logs`, label: dict.sidebar.logs, icon: ScrollText },
    { href: `/${lang}/keys`, label: dict.sidebar.keys, icon: Key },
    { href: `/${lang}/settings`, label: dict.sidebar.settings, icon: Settings },
    {
      href: `/${lang}/billing`,
      label: dict.sidebar.billing,
      icon: CreditCard,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition-colors",
                active
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

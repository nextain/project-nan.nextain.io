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

export function ProtectedSidebar() {
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
    <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
      <nav className="flex flex-col gap-1 p-3 pt-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

import { Coffee, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";

export function CafeluaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Orbit className="absolute h-[140%] w-[140%] text-primary/40 animate-[spin_10s_linear_infinite]" />
      <Coffee className="relative z-10 h-full w-full text-primary" />
    </div>
  );
}

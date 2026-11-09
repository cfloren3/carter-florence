import type { Exchange } from "@/data/conversation";
import { site } from "@/data/site";
import { ChatExchange } from "./ChatExchange";
import { cn } from "@/lib/utils";

/** A run of exchanges. Unwritten (`todo`) answers are dropped in production. */
export function ChatThread({ items, dark, className }: { items: Exchange[]; dark?: boolean; className?: string }) {
  const shown = items.filter((x) => x.answer || site.showPlaceholders);
  if (!shown.length) return null;
  return (
    <div className={cn("flex flex-col gap-14 md:gap-20", className)}>
      {shown.map((x) => (
        <ChatExchange key={x.id} x={x} dark={dark} />
      ))}
    </div>
  );
}

/** Every visible exchange, in page order — feeds the Ask bar. */
export function visibleExchanges(groups: Exchange[][]) {
  return groups.flat().filter((x) => x.answer || site.showPlaceholders);
}

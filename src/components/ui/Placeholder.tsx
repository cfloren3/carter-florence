import { cn } from "@/lib/utils";

/**
 * Clearly-marked editorial placeholder for unwritten copy. Visible only while
 * `site.showPlaceholders` is true (callers decide).
 */
export function TodoNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "border border-dashed border-mute/40 bg-stone/60 px-5 py-4 text-[0.9375rem] leading-relaxed text-mute",
        className
      )}
    >
      <span className="eyebrow mb-2 block text-ink/70">Editorial placeholder, to be written</span>
      {children}
    </div>
  );
}

/** Inline marker for facts that still need confirming. */
export function ConfirmMark({ children = "To confirm" }: { children?: React.ReactNode }) {
  return (
    <span className="eyebrow ml-2 inline-block border border-dashed border-current px-1.5 py-0.5 text-[0.5625rem] tracking-[0.14em] text-mute">
      {children}
    </span>
  );
}

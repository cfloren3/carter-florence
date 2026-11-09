import { cn } from "@/lib/utils";

/**
 * ↗ arrow that slides out of its box diagonally on parent hover while a
 * twin slides in. Put `group` on the hovered parent.
 */
export function Arrow({ className }: { className?: string }) {
  const path = (
    <svg viewBox="0 0 16 16" fill="none" className="h-full w-full" aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
  return (
    <span aria-hidden className={cn("relative inline-block h-[0.8em] w-[0.8em] overflow-hidden align-[-0.05em]", className)}>
      <span className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-full group-hover:-translate-y-full group-focus-visible:translate-x-full group-focus-visible:-translate-y-full">
        {path}
      </span>
      <span className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0">
        {path}
      </span>
    </span>
  );
}

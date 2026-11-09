"use client";

import { scrollToTarget } from "@/lib/animations/lenis-store";
import { useYear } from "@/lib/hooks";

/** Minimal footer that continues the charcoal contact section. */
export function Footer() {
  const year = useYear(2026);
  return (
    <footer data-theme="dark" className="bg-ink text-grey">
      <div className="shell flex flex-col gap-4 border-t border-paper/10 py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
        <p>
          Carter Florence © <span suppressHydrationWarning>{year}</span>
        </p>
        <p className="t-serif text-base text-paper/80">Built with curiosity.</p>
        <button
          type="button"
          onClick={() => {
            scrollToTarget(0, 0);
            document.getElementById("top")?.focus({ preventScroll: true });
          }}
          className="group flex min-h-11 items-center gap-3 self-start text-paper sm:self-auto"
        >
          <span className="link-line">Back to top</span>
          <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 transition-transform duration-500 group-hover:-translate-y-1">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Lightweight page transition. On the very first load nothing is delayed
 * (good for LCP and crawlers). On subsequent client-side navigations a forest
 * curtain lifts away while the new page rises in — pure CSS, so it costs
 * nothing and collapses to instant under reduced motion.
 */
let hasNavigated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animate && (
        <div aria-hidden className="page-curtain pointer-events-none fixed inset-0 z-[65] bg-ink" />
      )}
      <div className={animate ? "page-enter" : undefined}>{children}</div>
    </>
  );
}

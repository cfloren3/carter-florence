"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery, useWebGL } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Mounts a WebGL scene only while its area is near the viewport (and only
 * when WebGL exists and motion is allowed), then unmounts it to free the GPU.
 */
export function InView({
  children,
  className,
  margin = "300px",
  minWidth = 0,
}: {
  children: ReactNode;
  className?: string;
  margin?: string;
  /** Skip entirely below this viewport width (px). */
  minWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery(`(min-width: ${minWidth}px)`);
  const ok = useWebGL();

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: margin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [margin]);

  const active = ok && !reduce && (minWidth === 0 || wide) && near;
  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none", className)}>
      {active && children}
    </div>
  );
}

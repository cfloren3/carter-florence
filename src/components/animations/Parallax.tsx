"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

/** Moves content at a slightly different speed to the page. Desktop/tablet only. */
export function Parallax({
  children,
  className,
  speed = 12,
}: {
  children: ReactNode;
  className?: string;
  /** yPercent travelled across the viewport. Negative = moves up faster. */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

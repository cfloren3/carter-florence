"use client";

import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

/** Horizontal separator that draws itself in from the left. */
export function LineRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current || reducedMotion()) return;
    gsap.from(ref.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.6,
      ease: "expo.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
    });
  });
  return <div ref={ref} aria-hidden className={cn("hairline w-full", className)} />;
}

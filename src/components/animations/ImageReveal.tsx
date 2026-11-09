"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  /** Which edge the image wipes in from. */
  from?: "bottom" | "left" | "right";
  delay?: number;
}

const START: Record<NonNullable<ImageRevealProps["from"]>, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Clip-path wipe with a counter-scale on the inner media. */
export function ImageReveal({ children, className, from = "bottom", delay = 0 }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion()) return;
      const inner = el.querySelector("[data-reveal-inner]");
      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.fromTo(
        el,
        { clipPath: START[from] },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }
      );
      if (inner) tl.from(inner, { scale: 1.18, duration: 1.9, ease: "expo.out" }, 0.1);
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}

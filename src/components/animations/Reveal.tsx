"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Animate direct children one after another instead of the block as one. */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
}

/** Soft fade-and-rise as content scrolls into view. */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  stagger,
  y = 32,
  delay = 0,
  start = "top 90%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;
      const targets = stagger ? Array.from(ref.current.children) : ref.current;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1.2,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

"use client";

import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { formatNumber } from "@/lib/utils";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Renders the final number on the server (SEO / no-JS), then counts up from
 * zero once when scrolled into view. Screen readers get the final value only.
 */
export function CountUp({ value, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${formatNumber(value)}${suffix}`;

  useGSAP(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const counter = { n: 0 };
    el.textContent = `${prefix}0${suffix}`;
    gsap.to(counter, {
      n: value,
      duration: value > 1000 ? 2.4 : 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${formatNumber(Math.round(counter.n))}${suffix}`;
      },
    });
  });

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {final}
      </span>
    </span>
  );
}

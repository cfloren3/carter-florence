"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion, finePointer } from "@/lib/animations/gsap";

/**
 * Subtle magnetic pull toward the pointer on desktop. Purely visual — the
 * wrapped link/button keeps its normal click and keyboard behaviour.
 */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion() || !finePointer()) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref }
  );
  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}

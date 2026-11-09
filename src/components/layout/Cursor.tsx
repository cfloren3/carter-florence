"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Contextual cursor — appears ONLY over elements marked `data-cursor="Label"`
 * (project images, gallery tiles). The system cursor is never hidden, so
 * usability is unaffected. Desktop / fine pointers only.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("View");
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduce ? 0 : 0.5;
    const xTo = gsap.quickTo(el, "x", { duration: d, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: d, ease: "power3.out" });
    let active = false;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (t && !active) {
        active = true;
        setLabel(t.dataset.cursor || "View");
        gsap.to(el, { scale: 1, autoAlpha: 1, duration: reduce ? 0 : 0.45, ease: "expo.out" });
      } else if (!t && active) {
        active = false;
        gsap.to(el, { scale: 0.3, autoAlpha: 0, duration: reduce ? 0 : 0.35, ease: "power2.out" });
      } else if (t && t.dataset.cursor) {
        setLabel(t.dataset.cursor);
      }
    };
    const leave = () => {
      active = false;
      gsap.to(el, { scale: 0.3, autoAlpha: 0, duration: 0.3 });
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] -ml-12 -mt-12 flex h-24 w-24 scale-[0.3] items-center justify-center rounded-full bg-ink/90 text-ivory opacity-0 backdrop-blur-sm"
      style={{ visibility: "hidden" }}
    >
      <span className="eyebrow text-[0.625rem]">{label} ↗</span>
    </div>
  );
}

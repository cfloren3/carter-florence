"use client";
/**
 * Single place GSAP plugins are registered. Import gsap from here, never
 * directly, so plugins are always registered before use.
 * SplitText is part of the free GSAP package since v3.13.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

/** Motion language — reuse these rather than inventing new curves. */
export const MOTION = {
  ease: "expo.out",
  easeInOut: "power3.inOut",
  fast: 0.6,
  base: 1.1,
  slow: 1.6,
  stagger: 0.06,
} as const;

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * SplitText masks are exactly one line tall, which clips descenders on tight
 * display leading (g, y, p). Pad them downward and pull back with a negative
 * margin so layout is unchanged but the glyphs aren't cut.
 */
export function padMasks(split: { masks?: Element[] } | null | undefined) {
  const masks = split?.masks ?? [];
  if (masks.length) gsap.set(masks, { paddingBottom: "0.16em", marginBottom: "-0.16em" });
}

"use client";
import type Lenis from "lenis";

/** Tiny shared handle so menus/lightboxes can pause smooth scrolling. */
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (instance = l);
export const getLenis = () => instance;

export function scrollToTarget(target: string | number, offset = -72) {
  const l = getLenis();
  if (l) {
    l.scrollTo(target as string, { offset, duration: 1.2 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
  } else {
    const el = document.querySelector(target);
    el?.scrollIntoView();
  }
}

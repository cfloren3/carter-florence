"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/animations/gsap";
import { getLenis, setLenis } from "@/lib/animations/lenis-store";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * perfect sync. Disabled entirely for prefers-reduced-motion. Touch devices
 * keep native scrolling (Lenis default).
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -72 } });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // After client-side navigation: honour a #hash, otherwise start at the top.
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    const id = requestAnimationFrame(() => {
      const target = hash ? document.querySelector(hash) : null;
      if (lenis) {
        lenis.resize();
        if (target) lenis.scrollTo(target as HTMLElement, { offset: -72, immediate: true });
        else lenis.scrollTo(0, { immediate: true });
      } else if (target) {
        target.scrollIntoView();
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

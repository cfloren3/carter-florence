"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ProgressStop {
  id: string;
  label: string;
}

/**
 * "You are here": a vertical rail on the left (desktop) with a dot for every
 * part of the page. The rail fills as you scroll, the current part is marked,
 * and hovering shows every label (click to jump). Phones get a slim bar on the
 * right edge plus the current part's name.
 */
export function SideProgress({ stops }: { stops: ProgressStop[] }) {
  const [active, setActive] = useState(-1);
  const fill = useRef<HTMLSpanElement>(null);
  const mobileFill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.scrollY + window.innerHeight * 0.4;
      const tops = stops.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
      let i = -1;
      tops.forEach((t, k) => {
        if (t <= mid) i = k;
      });
      // continuous position along the rail: index + fraction toward the next stop
      let pos = 0;
      if (i >= 0) {
        const next = tops[i + 1] ?? document.documentElement.scrollHeight;
        const frac = Math.min(1, Math.max(0, (mid - tops[i]) / Math.max(1, next - tops[i])));
        pos = (i + (i === stops.length - 1 ? 0 : frac)) / Math.max(1, stops.length - 1);
      }
      setActive(i);
      if (fill.current) fill.current.style.transform = `scaleY(${pos})`;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (mobileFill.current) mobileFill.current.style.transform = `scaleY(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stops]);

  const visible = active >= 0;

  return (
    <>
      {/* desktop rail */}
      <nav
        aria-label="Page progress"
        className={cn(
          "group/rail fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 text-white mix-blend-difference transition-opacity duration-500 lg:block xl:left-5",
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ol className="relative flex flex-col gap-[14px] py-1">
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-white/25">
            <span ref={fill} className="absolute inset-0 origin-top scale-y-0 bg-white" />
          </span>
          {stops.map((s, i) => (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                aria-current={i === active ? "location" : undefined}
                className="flex h-3 items-center gap-3"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative block h-[11px] w-[11px] shrink-0 rounded-full border transition-all duration-300",
                    i === active ? "scale-110 border-white bg-white" : i < active ? "scale-[0.55] border-white bg-white" : "scale-[0.55] border-white/60 bg-black"
                  )}
                />
                <span
                  className={cn(
                    "eyebrow whitespace-nowrap text-[0.625rem] transition-all duration-300",
                    i === active
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover/rail:translate-x-0 group-hover/rail:opacity-70"
                  )}
                >
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* phones: slim bar on the right edge + current section */}
      <div aria-hidden className={cn("fixed right-1 top-20 bottom-36 z-40 w-[2px] text-white mix-blend-difference transition-opacity duration-500 lg:hidden", visible ? "opacity-100" : "opacity-0")}>
        <span className="absolute inset-0 rounded-full bg-white/25" />
        <span ref={mobileFill} className="absolute inset-0 origin-top scale-y-0 rounded-full bg-white" />
      </div>
    </>
  );
}

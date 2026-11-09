"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { ChapterChat, ChapterTag } from "./ChapterDetails";
import { pad2 } from "@/lib/utils";

/**
 * Chapter treatment "compact": several roles in one tight, scannable grid
 * (used for everything at Western — 180DC and the clubs). Tiles draw their
 * top rule and rise in one after another.
 */
export function CompactChapter({ p, index }: { p: Project; index: number }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-grid]")[0], start: "top 80%", once: true } });
      tl.from(q("[data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.1, stagger: 0.1, ease: "expo.inOut" }).from(
        q("[data-tile-body]"),
        { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.1, ease: "expo.out" },
        0.25
      );
    },
    { scope: root }
  );

  const roles = p.roles ?? [];
  return (
    <article
      ref={root}
      id={`work-${p.slug}`}
      aria-labelledby={`ch-${p.slug}`}
      className="relative bg-stone py-24 lg:py-32"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(32,35,33,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(32,35,33,.05) 1px, transparent 1px)",
        backgroundSize: "calc(100% / 12) 88px",
      }}
    >
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <ChapterTag index={index} p={p} className="text-mute" />
            <h3 id={`ch-${p.slug}`} className="t-display mt-4 text-[clamp(3rem,7vw,6.5rem)]">
              At <span className="italic">Western.</span>
            </h3>
          </div>
          <p className="eyebrow text-mute lg:pb-3">
            {p.period} · {p.location}
          </p>
        </div>

        <ol data-grid className="mt-12 grid gap-x-8 gap-y-2 md:grid-cols-2 lg:mt-16">
          {roles.map((r, i) => (
            <li key={r.org} className="relative pt-6 pb-8">
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/25" />
              <div data-tile-body className="flex gap-6">
                <span className="eyebrow w-6 shrink-0 pt-2 text-mute">{pad2(i + 1)}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="t-head text-[clamp(1.5rem,2.2vw,2rem)]">{r.org}</p>
                    <p className="eyebrow text-mute">{r.dates}</p>
                  </div>
                  <p className="mt-1 text-[0.9375rem] font-medium">{r.role}</p>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink/70">{r.line}</p>
                  {r.stat && (
                    <p className="mt-4 flex items-baseline gap-3">
                      <span className="t-head text-[2rem]">{r.stat}</span>
                      <span className="eyebrow text-mute">{r.statLabel}</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-3xl">
          <ChapterChat p={p} />
        </div>
      </div>
    </article>
  );
}

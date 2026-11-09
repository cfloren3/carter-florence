"use client";

import { useRef } from "react";
import { metrics, SCOPE_LABEL } from "@/data/metrics";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pad2 } from "@/lib/utils";

/**
 * 02: BY THE NUMBERS
 * A 2×2 grid, no pinning, no WebGL. As each pair scrolls into view, its
 * digits condense out of a soft "vapour" (blur, glow and drift to sharp)
 * one by one, and stay put above you. Scrolling back up dissolves them.
 * Reduced motion / no JS: the figures, shown plainly.
 */
export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      q("[data-slide]").forEach((cell) => {
        const digits = cell.querySelectorAll<HTMLElement>("[data-digit]");
        const meta = cell.querySelectorAll("[data-meta]");
        gsap.set(digits, {
          autoAlpha: 0,
          filter: "blur(18px)",
          scale: 1.35,
          yPercent: () => gsap.utils.random(-45, 25),
          xPercent: () => gsap.utils.random(-25, 25),
          textShadow: "0 0 32px rgba(247,246,242,0.9)",
        });
        gsap.set(meta, { autoAlpha: 0, y: 16 });
        const tl = gsap
          .timeline({ paused: true })
          .to(digits, {
            autoAlpha: 1,
            filter: "blur(0px)",
            scale: 1,
            yPercent: 0,
            xPercent: 0,
            textShadow: "0 0 0px rgba(247,246,242,0)",
            duration: 1.3,
            ease: "power3.out",
            stagger: { each: 0.07, from: "random" },
          })
          .to(meta, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, 0.55);
        ScrollTrigger.create({
          trigger: cell,
          start: "top 82%",
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        });
        // already past it on load (e.g. jumping via a link): show it formed
        if (cell.getBoundingClientRect().top < window.innerHeight * 0.82) tl.progress(1);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="numbers" data-theme="dark" aria-labelledby="numbers-title" className="relative bg-ink pb-20 text-paper lg:pb-28">
      <div className="shell pt-28 lg:pt-40">
        <Eyebrow index="02" className="text-paper">
          <span id="numbers-title">By the numbers</span>
        </Eyebrow>
      </div>

      <div id="numbers-grid" className="relative mt-10 lg:mt-16">
        <ol className="shell relative z-10 grid gap-x-10 md:grid-cols-2">
          {metrics.map((m, i) => (
            <li key={m.id} id={`fig-${m.id}`} data-slide className="flex flex-col border-t border-paper/15 py-14 lg:min-h-[52svh] lg:justify-center lg:py-16">
              <p data-meta className="eyebrow flex items-center gap-3 text-sage">
                <span className="text-grey">{pad2(i + 1)}</span>
                {m.label}
              </p>
              <p data-number className="t-display mt-4 whitespace-nowrap text-[clamp(3.75rem,19vw,6.5rem)] tracking-[-0.03em] md:text-[clamp(4rem,8.5vw,9.5rem)]">
                <span className="sr-only">{m.display}</span>
                <span aria-hidden className="inline-flex py-[0.1em]">
                  {[...m.display].map((ch, k) => (
                    <span key={k} data-digit className="inline-block will-change-[filter,transform]">
                      {ch}
                    </span>
                  ))}
                </span>
              </p>
              <p data-meta className="mt-4 max-w-md text-[1rem] leading-snug text-paper/80">
                {m.context}
              </p>
              <p data-meta className="mt-5 flex flex-wrap items-center gap-4">
                <span className="eyebrow border border-paper/20 px-2.5 py-1.5 text-grey">{SCOPE_LABEL[m.scope]}</span>
                {m.project && (
                  <a href={`#work-${m.project}`} className="eyebrow link-line text-paper">
                    See the chapter ↓
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

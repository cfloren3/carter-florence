"use client";

import { useRef, useState } from "react";
import type { StoryEntry } from "@/data/experience";
import { site } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { scrollToTarget } from "@/lib/animations/lenis-store";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { ConfirmMark } from "@/components/ui/Placeholder";
import { cn, pad2 } from "@/lib/utils";

type Entry = StoryEntry & { resolved?: string };

/**
 * THE STORY SO FAR — an interactive biography.
 * Desktop: left column is sticky (rolling year, cross-fading photo, chapter
 * index you can click); right column scrolls through the chapters with a
 * progress line. The chapter nearest the centre of the screen is "active".
 * Mobile: each chapter shows its own year and photo inline.
 */
export function StoryTimeline({ entries, intro }: { entries: Entry[]; intro?: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      q("[data-entry]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (reducedMotion()) return;
      gsap.fromTo(
        q("[data-progress]"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-track]")[0], start: "top 55%", end: "bottom 55%", scrub: 0.3 } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="story" aria-labelledby="story-title" className="relative py-28 lg:py-44">
      <div className="shell">
        <Eyebrow index="04" className="text-ink">
          Biography
        </Eyebrow>
        <SplitReveal
          id="story-title"
          as="h2"
          by="chars"
          className="t-display mt-8 text-[clamp(3.5rem,11vw,11.5rem)] tracking-[-0.03em]"
        >
          The story so far.
        </SplitReveal>
        {intro && <div className="mt-16 lg:mt-24">{intro}</div>}
      </div>

      <div className="shell mt-16 grid grid-cols-12 gap-x-4 lg:mt-28 lg:gap-x-10">
        {/* ---------- STICKY COLUMN (desktop) */}
        <div className="col-span-5 hidden lg:block">
          <div className="sticky top-20 flex h-[calc(100svh-6rem)] flex-col justify-between pb-6">
            <div aria-hidden className="relative h-[clamp(7rem,12vw,12rem)] overflow-hidden">
              {entries.map((e, i) => (
                <span
                  key={i}
                  className={cn(
                    "t-display absolute inset-0 text-[clamp(7rem,12vw,12rem)] tracking-[-0.03em] transition-transform duration-[900ms] ease-[var(--ease-out)]",
                    i === active ? "translate-y-0" : i < active ? "-translate-y-full" : "translate-y-full"
                  )}
                >
                  {e.year}
                </span>
              ))}
            </div>

            <div className="relative my-6 min-h-0 flex-1 overflow-hidden">
              {entries.map((e, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform,clip-path] duration-[1100ms] ease-[var(--ease-out)]",
                    i === active ? "scale-100 opacity-100 [clip-path:inset(0_0_0_0)]" : "scale-105 opacity-0 [clip-path:inset(0_0_0_100%)]"
                  )}
                >
                  <MediaFrame
                    src={e.resolved}
                    alt={e.image.alt}
                    placeholderLabel={e.image.placeholderLabel}
                    expectedPath={e.image.src}
                    sizes="40vw"
                    objectPosition={e.image.focus}
                    theme={i % 2 ? "rose" : "sage"}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>

            <nav aria-label="Story chapters">
              <p className="eyebrow mb-3 text-mute">Click to navigate</p>
              <ol className="flex flex-col">
                {entries.map((e, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => scrollToTarget(`#story-${i}`, -window.innerHeight * 0.3)}
                      aria-current={i === active ? "step" : undefined}
                      className={cn(
                        "group flex min-h-9 w-full items-center gap-3 text-left text-[0.875rem] transition-colors duration-500",
                        i === active ? "text-ink" : "text-mute hover:text-ink"
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", i === active ? "bg-blush" : "bg-ink/15")} />
                      <span className="eyebrow w-10">{e.year}</span>
                      <span className="link-line">{e.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        {/* ---------- SCROLLING COLUMN */}
        <ol data-track className="relative col-span-12 lg:col-[7/span_6]">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-ink/10">
            <span data-progress className="block h-full w-full origin-top bg-ink" />
          </span>
          {entries.map((e, i) => (
            <li
              key={i}
              id={`story-${i}`}
              data-entry
              className={cn(
                "relative flex flex-col justify-center pb-16 pl-8 transition-opacity duration-700 lg:min-h-[78svh] lg:pb-0 lg:pl-14",
                i === active ? "lg:opacity-100" : "lg:opacity-30"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[5px] top-2 h-[11px] w-[11px] rounded-full border border-ink bg-paper transition-colors duration-500 lg:top-1/2",
                  i === active && "bg-blush"
                )}
              />
              <p className="t-display text-[clamp(4rem,18vw,6rem)] tracking-[-0.03em] lg:hidden">{e.year}</p>
              <p className="eyebrow text-mute">
                Chapter {pad2(i + 1)} · <span className="lg:inline">{e.year}</span>
                {e.confirm && site.showPlaceholders && <ConfirmMark>Year to confirm</ConfirmMark>}
              </p>
              <h3 className="t-head mt-4 text-[clamp(2rem,3.6vw,3.5rem)] tracking-[-0.02em]">{e.title}</h3>
              <p className="mt-5 max-w-xl text-[1.125rem] leading-relaxed text-ink/75">{e.story}</p>
              <div className="mt-8 lg:hidden">
                <MediaFrame
                  src={e.resolved}
                  alt={e.image.alt}
                  placeholderLabel={e.image.placeholderLabel}
                  expectedPath={e.image.src}
                  sizes="90vw"
                  objectPosition={e.image.focus}
                  theme={i % 2 ? "rose" : "sage"}
                  className="aspect-[4/3] w-full"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

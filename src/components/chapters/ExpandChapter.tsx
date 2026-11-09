"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap, SplitText, useGSAP, reducedMotion, padMasks } from "@/lib/animations/gsap";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Award, ArrowDown } from "lucide-react";
import { ChapterMeta, ChapterChat, ChapterHighlights, ChapterTag, PressList } from "./ChapterDetails";

/**
 * Chapter treatment "expand" (Yardex):
 * a framed photo opens smoothly to full-bleed as the chapter scrolls up
 * (scrubbed, never pinned), then the chapter tag and title rise in.
 */
type Img = { src?: string; alt: string; placeholderLabel: string; expectedPath?: string; focus?: string };

export function ExpandChapter({ p, index, coverSrc, images = [] }: { p: Project; index: number; coverSrc?: string; images?: Img[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const stage = q("[data-pin]")[0];
      const title = SplitText.create(q("[data-title]"), { type: "chars", mask: "chars" });
      padMasks(title);
      // One continuous zoom tied to scroll (no pin): the framed photo opens to
      // full-bleed while the section travels up to the top of the screen.
      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: stage, start: "top bottom", end: "top top", scrub: true } })
        .fromTo(q("[data-frame]"), { clipPath: "inset(18% 22% 18% 22% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0)
        .fromTo(q("[data-img]"), { scale: 1.35 }, { scale: 1 }, 0)
        .fromTo(q("[data-shade]"), { autoAlpha: 0 }, { autoAlpha: 1 }, 0.5);
      // then the name rises in as it settles
      gsap
        .timeline({ scrollTrigger: { trigger: stage, start: "top 35%", toggleActions: "play none none reverse" } })
        .from(q("[data-tag]"), { autoAlpha: 0, y: 20, duration: 0.5, ease: "power3.out" })
        .from(title.chars, { yPercent: 110, stagger: 0.025, duration: 0.8, ease: "expo.out" }, 0.1)
        .from(q("[data-sub]"), { autoAlpha: 0, y: 20, duration: 0.5, ease: "power3.out" }, 0.4);
      // the photo drifts slightly as you scroll past it
      gsap.to(q("[data-img]"), { yPercent: 5, ease: "none", scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );

  return (
    <article ref={root} id={`work-${p.slug}`} aria-labelledby={`ch-${p.slug}`} className="relative">
      <div data-pin className="relative h-[85svh] lg:h-[100svh]">
        <div
          data-frame
          className="absolute inset-0 overflow-hidden [.js_&]:motion-safe:[clip-path:inset(18%_22%_18%_22%_round_28px)]"
        >
          <div data-img className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform">
            <MediaFrame
              src={coverSrc}
              alt={p.cover.alt}
              placeholderLabel={p.cover.placeholderLabel}
              expectedPath={p.cover.src}
              sizes="100vw"
              theme={p.theme}
              className="h-full w-full"
                labelAt="top"
            />
          </div>
          <div data-shade className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 text-paper">
          <div className="shell pb-8 lg:pb-14">
            <div data-tag>
              <ChapterTag index={index} p={p} />
            </div>
            <h3 id={`ch-${p.slug}`} data-title className="t-display mt-3 text-[clamp(3.25rem,11vw,12rem)] tracking-[-0.03em]">
              {p.name}
            </h3>
            <p data-sub className="eyebrow mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-paper/85">
              <span>{[p.role, p.period, p.location].filter(Boolean).join(" · ")}</span>
              {p.site && (
                <a href={p.site.url} target="_blank" rel="noopener noreferrer" className="pointer-events-auto rounded-full border border-paper/40 px-3 py-1.5 transition-colors hover:bg-paper hover:text-ink">
                  {p.site.label} ↗
                </a>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="shell grid grid-cols-12 gap-x-4 gap-y-12 py-20 lg:gap-x-8 lg:py-28">
        <div className="col-span-12 lg:col-[1/span_4]">
          <ChapterMeta p={p} />
          <ChapterHighlights p={p} />
        </div>
        <div className="col-span-12 lg:col-[6/span_7]">
          <ChapterChat p={p} />
        </div>
        {p.built && (
          <div className="col-span-12">
            <a href={p.built.href} className="group flex flex-col gap-4 bg-ink p-6 text-paper md:flex-row md:items-center md:justify-between md:p-10">
              <span>
                <span className="eyebrow block text-sage">Built by me</span>
                <span className="t-display mt-2 block text-[clamp(2.75rem,6vw,5rem)] leading-[0.9] tracking-[-0.03em]">{p.built.name}</span>
                <span className="mt-3 block max-w-md text-[1.0625rem] leading-snug text-paper/80">{p.built.line}</span>
              </span>
              <span className="eyebrow flex shrink-0 items-center gap-2 text-paper">
                <span className="link-line">{p.built.label}</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
              </span>
            </a>
          </div>
        )}
        {p.awards && p.awards.length > 0 && (
          <div className="col-span-12">
            <p className="eyebrow text-mute">Recognition</p>
            <ul className="mt-4 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {p.awards.map((a) => (
                <li key={a.title} className="flex flex-col gap-3 bg-paper/80 p-5 backdrop-blur-sm">
                  <span className="flex items-center justify-between">
                    <Award className="h-5 w-5 text-blush" aria-hidden />
                    {a.year && <span className="eyebrow text-mute">{a.year}</span>}
                  </span>
                  <span className="t-head text-[1.5rem] leading-[1.1]">{a.title}</span>
                  <span className="eyebrow text-mute">{a.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {p.press && p.press.length > 0 && (
          <div className="col-span-12">
            <PressList p={p} />
          </div>
        )}
        {images.length > 0 && (
          <div className="col-span-12 grid grid-cols-2 gap-3 md:gap-4">
            {images.slice(0, 2).map((img) => (
              <div key={img.placeholderLabel} className="overflow-hidden">
                <MediaFrame
                  src={img.src}
                  alt={img.alt}
                  placeholderLabel={img.placeholderLabel}
                  expectedPath={img.expectedPath}
                  sizes="(min-width: 768px) 50vw, 50vw"
                  theme={p.theme}
                  objectPosition={img.focus}
                  className="aspect-[4/5] w-full md:aspect-[4/3]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

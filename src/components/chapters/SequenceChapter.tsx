"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { MediaFrame } from "@/components/media/MediaFrame";
import { ChapterMeta, ChapterChat, ChapterTag, FactGrid } from "./ChapterDetails";
import { pad2 } from "@/lib/utils";
import { profile } from "@/data/profile";
import { Play } from "lucide-react";

interface Img {
  src?: string;
  alt: string;
  placeholderLabel: string;
  expectedPath?: string;
  focus?: string;
}

/**
 * Chapter treatment "sequence" (DECA): one wide photo that drifts gently as
 * it passes, with its caption rising in, then the impact strip and Q&A.
 */
export function SequenceChapter({ p, index, images }: { p: Project; index: number; images: Img[] }) {
  const root = useRef<HTMLElement>(null);
  const captions = p.sequenceCaptions ?? [];
  const frames = images.slice(0, Math.max(captions.length, 1));

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      q("[data-slide]").forEach((s) => {
        gsap.fromTo(
          s.querySelector("[data-img]"),
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.from(s.querySelectorAll("[data-cap]"), {
          yPercent: 60,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: s, start: "top 75%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root }
  );

  return (
    <article ref={root} id={`work-${p.slug}`} data-theme="dark" aria-labelledby={`ch-${p.slug}`} className="relative bg-ink text-paper">
      <div className="shell flex flex-col gap-6 pb-14 pt-28 lg:flex-row lg:items-end lg:justify-between lg:pb-16 lg:pt-40">
        <div>
          <ChapterTag index={index} p={p} className="text-grey" />
          <h3 id={`ch-${p.slug}`} className="t-display mt-4 text-[clamp(4.5rem,16vw,15rem)] tracking-[-0.03em]">
            {p.name}
          </h3>
        </div>
        <p className="max-w-sm text-[1.0625rem] leading-snug text-paper/75 lg:pb-4 lg:text-right">{p.summary}</p>
      </div>
      {p.explainer && (
        <div className="shell pb-14 lg:pb-16">
          <div className="grid gap-4 border-t border-paper/15 pt-6 md:grid-cols-12 md:gap-8">
            <p className="eyebrow text-sage md:col-span-3">{p.explainer.title}</p>
            <p className="text-[1.0625rem] leading-relaxed text-paper/80 md:col-span-8">{p.explainer.text}</p>
          </div>
          {profile.speech && (
            <a
              href={profile.speech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-paper px-5 py-3 text-[0.875rem] font-semibold text-ink"
            >
              <Play className="h-4 w-4" aria-hidden />
              {profile.speech.label}
            </a>
          )}
        </div>
      )}

      <ol className="flex flex-col gap-4 lg:gap-6">
        {frames.map((img, i) => (
          <li key={img.placeholderLabel + i} data-slide className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-[80svh]">
              <div data-img className="absolute inset-x-0 -inset-y-[8%] will-change-transform">
                <MediaFrame
                  src={img.src}
                  alt={img.alt}
                  placeholderLabel={img.placeholderLabel}
                  expectedPath={img.expectedPath}
                  sizes="100vw"
                  theme="forest"
                  objectPosition={img.focus}
                  className="h-full w-full"
                  labelAt="top"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="shell absolute inset-x-0 bottom-0 pb-24 lg:pb-28">
                {frames.length > 1 && (
                  <p data-cap className="eyebrow mb-2 text-paper/70">
                    {pad2(i + 1)} / {pad2(frames.length)}
                  </p>
                )}
                <p data-cap className="t-head max-w-[22ch] text-[clamp(1.75rem,4vw,4rem)] leading-[1.02] tracking-[-0.02em]">
                  {captions[i]}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="shell grid grid-cols-12 gap-x-4 gap-y-12 py-20 lg:gap-x-8 lg:py-28">
        <div className="col-span-12 lg:col-[1/span_4]">
          <ChapterMeta p={p} dark />
        </div>
        <div className="col-span-12 lg:col-[6/span_7]">
          <ChapterChat p={p} dark />
        </div>
        <div className="col-span-12">
          <p className="eyebrow mb-6 text-grey">Impact</p>
          <FactGrid p={p} dark />
        </div>
      </div>
    </article>
  );
}

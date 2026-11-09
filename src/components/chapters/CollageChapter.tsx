"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap, SplitText, useGSAP, reducedMotion, padMasks } from "@/lib/animations/gsap";
import { MediaFrame } from "@/components/media/MediaFrame";
import { ChapterMeta, ChapterChat, ChapterTag } from "./ChapterDetails";
import { cn } from "@/lib/utils";
import { SCOPE_LABEL } from "@/data/metrics";

interface Img {
  src?: string;
  alt: string;
  placeholderLabel: string;
  expectedPath?: string;
}

/**
 * Chapter treatment "collage" (Beyond Borders):
 * the headline figure stays sticky on the left while a three-photo collage
 * scrolls past on the right at different speeds. The figure's digits roll in.
 */
export function CollageChapter({ p, index, images }: { p: Project; index: number; images: Img[] }) {
  const root = useRef<HTMLElement>(null);
  const [lead, ...rest] = p.facts;

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const fig = SplitText.create(q("[data-figure]"), { type: "chars", mask: "chars" });
      padMasks(fig);
      gsap.from(fig.chars, {
        yPercent: 110,
        stagger: 0.045,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-figure]")[0], start: "top 80%", once: true },
      });
      q("[data-photo]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.fromTo(
            el,
            { yPercent: [0, 18, -6][i] ?? 0 },
            { yPercent: [0, -22, 8][i] ?? 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      });
    },
    { scope: root }
  );

  const shapes = [
    "aspect-[4/5] w-full",
    "aspect-square w-[62%] ml-auto -mt-[18%] relative z-10",
    "aspect-[3/2] w-[82%] mt-10",
  ];

  return (
    <article ref={root} id={`work-${p.slug}`} aria-labelledby={`ch-${p.slug}`} className="relative py-24 lg:py-40">
      <div className="shell grid grid-cols-12 gap-x-4 gap-y-16 lg:gap-x-10">
        <div className="col-span-12 lg:col-[1/span_5]">
          <div className="flex flex-col gap-10 lg:sticky lg:top-24">
            <div>
              <ChapterTag index={index} p={p} className="text-mute" />
              <h3 id={`ch-${p.slug}`} className="t-head mt-4 text-[clamp(2.75rem,5vw,4.75rem)] tracking-[-0.03em]">
                {p.name}
              </h3>
            </div>

            {lead && (
              <div>
                <p data-figure className="t-display whitespace-nowrap text-[clamp(3.5rem,7vw,7.25rem)] tracking-[-0.03em]">
                  {lead.value}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-3 text-[0.9375rem]">
                  {lead.label}
                  <span className="eyebrow border border-ink/20 px-2 py-1 text-[0.5625rem] text-mute">{SCOPE_LABEL[lead.scope]}</span>
                </p>
                {rest.map((f) => (
                  <p key={f.label} className="mt-6 flex items-baseline gap-4 border-t border-ink/15 pt-4">
                    <span className="t-head text-[clamp(1.75rem,2.6vw,2.5rem)] tracking-[-0.02em]">{f.value}</span>
                    <span className="text-[0.875rem] text-ink/70">
                      {f.label}
                      <span className="eyebrow ml-2 text-[0.5625rem] text-mute">{SCOPE_LABEL[f.scope]}</span>
                    </span>
                  </p>
                ))}
              </div>
            )}

            <ChapterMeta p={p} />
          </div>
        </div>

        <div className="col-span-12 lg:col-[7/span_6]">
          <div className="relative">
            {images.slice(0, 3).map((img, i) => (
              <div key={img.placeholderLabel + i} data-photo className={cn("overflow-hidden", shapes[i])}>
                <MediaFrame
                  src={img.src}
                  alt={img.alt}
                  placeholderLabel={img.placeholderLabel}
                  expectedPath={img.expectedPath}
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  theme={p.theme}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
          <div className="mt-20">
            <ChapterChat p={p} />
          </div>
        </div>
      </div>
    </article>
  );
}

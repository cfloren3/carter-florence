"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { gsap, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { Reveal } from "@/components/animations/Reveal";
import { ChapterMeta, ChapterChat, ChapterTag } from "./ChapterDetails";
import { cn } from "@/lib/utils";

type Screen = NonNullable<Project["product"]>["screens"][number] & { width: number; height: number };

function Shot({ s, className, sizes }: { s: Screen; className?: string; sizes: string }) {
  if (!s.src) return null;
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_30px_80px_-30px_rgba(32,35,33,0.35)] ring-1 ring-ink/10">
        <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes={sizes} className="block h-auto w-full" />
      </div>
      <figcaption className="eyebrow mt-3 text-mute">{s.caption}</figcaption>
    </figure>
  );
}

/**
 * Chapter treatment "product" (TraitCRM): real product screens from
 * traitcrm.com, a feature grid and the chapter conversation. No pinning.
 */
export function ProductChapter({ p, index, screens }: { p: Project; index: number; screens: Screen[] }) {
  const root = useRef<HTMLElement>(null);
  const prod = p.product!;
  const [hero, phone, ...rest] = screens;

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const stage = q("[data-stage]")[0];
      gsap.fromTo(q("[data-hero]"), { yPercent: 8 }, { yPercent: -4, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q("[data-phone]"), { yPercent: 30 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root }
  );

  return (
    <article ref={root} id={`work-${p.slug}`} aria-labelledby={`ch-${p.slug}`} className="relative overflow-hidden bg-[#eef0ea] py-24 lg:py-36">
      <div className="shell grid grid-cols-12 gap-x-4 gap-y-8 lg:gap-x-8">
        <div className="col-span-12 lg:col-span-7">
          <ChapterTag index={index} p={p} className="text-mute" />
          <h3 id={`ch-${p.slug}`} className="t-display mt-4 text-[clamp(4rem,13vw,12rem)] leading-[0.88] tracking-[-0.035em]">
            {p.name}
          </h3>
          <p className="t-head mt-6 max-w-[22ch] text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">{p.summary}</p>
        </div>
        <div className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-5">
          <p className="text-[1.0625rem] leading-snug text-ink/75">{prod.pitch}</p>
          <a
            href={prod.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.875rem] font-semibold text-paper"
          >
            Visit {prod.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>

      {/* hero showcase: dashboard + phone */}
      <div data-stage className="shell relative mt-16 lg:mt-24">
        <div className="relative lg:pr-[18%]">
          {hero && (
            <div data-hero>
              <Shot s={hero} sizes="(min-width: 1024px) 70vw, 100vw" />
            </div>
          )}
          {phone && (
            <div data-phone className="mx-auto mt-10 w-[70%] max-w-[22rem] lg:absolute lg:-bottom-10 lg:right-0 lg:mt-0 lg:w-[30%]">
              <Shot s={phone} sizes="(min-width: 1024px) 30vw, 70vw" />
            </div>
          )}
        </div>
      </div>

      {/* features */}
      <div className="shell mt-24 lg:mt-36">
        <p className="eyebrow text-mute">What it does</p>
        <Reveal as="ul" stagger={0.06} className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {prod.features.map((f) => (
            <li key={f.title} className="flex flex-col gap-3 border-t border-ink/20 pt-5">
              <span className="t-head text-[1.75rem] leading-[1.05] tracking-[-0.02em]">{f.title}</span>
              <span className="text-[1rem] leading-snug text-ink/75">{f.text}</span>
            </li>
          ))}
        </Reveal>
      </div>

      {/* more screens */}
      {rest.length > 0 && (
        <Reveal stagger={0.1} className={cn("shell mt-20 grid gap-8 md:grid-cols-3 md:items-start lg:mt-28")}>
          {rest.map((s) => (
            <Shot key={s.caption} s={s} sizes="(min-width: 768px) 33vw, 100vw" />
          ))}
        </Reveal>
      )}
      <p className="shell eyebrow mt-6 text-mute">Screens from traitcrm.com, shown with demo data.</p>

      <div className="shell mt-20 grid grid-cols-12 gap-x-4 gap-y-12 lg:mt-28 lg:gap-x-8">
        <div className="col-span-12 lg:col-[1/span_4]">
          <ChapterMeta p={p} />
        </div>
        <div className="col-span-12 lg:col-[6/span_7]">
          <ChapterChat p={p} />
        </div>
      </div>
    </article>
  );
}

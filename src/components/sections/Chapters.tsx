import { Fragment } from "react";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import type { MediaAsset } from "@/data/types";
import { resolveAsset } from "@/lib/assets";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ExpandChapter } from "@/components/chapters/ExpandChapter";
import { CollageChapter } from "@/components/chapters/CollageChapter";
import { SequenceChapter } from "@/components/chapters/SequenceChapter";
import { CompactChapter } from "@/components/chapters/CompactChapter";
import { ProductChapter } from "@/components/chapters/ProductChapter";
import { Philosophy } from "./Philosophy";

const resolve = (m: MediaAsset) => ({ ...m, src: resolveAsset(m.src), expectedPath: m.src });

function Chapter({ p, i }: { p: Project; i: number }) {
  const images = [p.cover, ...p.gallery].map(resolve);
  switch (p.chapter) {
    case "expand":
      return <ExpandChapter p={p} index={i} coverSrc={resolveAsset(p.cover.src)} images={images.slice(1)} />;
    case "collage":
      return <CollageChapter p={p} index={i} images={images} />;
    case "sequence":
      return <SequenceChapter p={p} index={i} images={images} />;
    case "product":
      return <ProductChapter p={p} index={i} screens={(p.product?.screens ?? []).map((s) => ({ ...s, src: resolveAsset(s.src) }))} />;
    case "compact":
      return <CompactChapter p={p} index={i} />;
  }
}

/**
 * 03: Work. A short "Learn more" beat, then the experience chapters, with
 * one of Carter's beliefs full-screen between them.
 */
export function Chapters() {
  const beliefs = profile.philosophies;
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="shell flex flex-col gap-8 pb-10 pt-20 lg:pb-14 lg:pt-28">
        <Eyebrow index="03" className="text-ink">
          Experience
        </Eyebrow>
        <SplitReveal id="work-title" by="chars" stagger={0.03} className="t-display text-[clamp(4rem,12vw,11rem)] leading-[0.88] tracking-[-0.035em]">
          Learn <span className="italic">more</span>
          <span className="text-blush">.</span>
        </SplitReveal>
        <Reveal className="flex items-center gap-4">
          <span className="eyebrow text-ink">Keep scrolling</span>
          <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-ink/15">
            <span className="scroll-cue absolute inset-x-0 top-0 block h-1/2 bg-ink" />
          </span>
        </Reveal>
      </div>
      {projects.map((p, i) => {
        const b = beliefs.findIndex((x) => x.after === p.slug);
        return (
          <Fragment key={p.slug}>
            <Chapter p={p} i={i} />
            {b >= 0 && <Philosophy quote={beliefs[b].quote} note={beliefs[b].note} index={b} total={beliefs.length} />}
          </Fragment>
        );
      })}
    </section>
  );
}

/** "What I do": the pitch, with proof, after the experience. */
export function WhatIDo() {
  return (
    <section id="what-i-do" aria-labelledby="what-title" className="relative border-t border-ink/10 py-28 lg:py-40">
      <div className="shell">
        <p className="eyebrow text-mute">In short</p>
        <SplitReveal id="what-title" by="words" className="t-display mt-6 text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.03em]">
          What I <span className="italic">do</span>.
        </SplitReveal>
        <Reveal as="ul" stagger={0.08} className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {profile.whatIDo.map((w) => (
            <li key={w.verb} className="flex flex-col gap-2 border-t border-ink/20 pt-5">
              <span className="t-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none tracking-[-0.02em]">{w.verb}</span>
              <span className="t-head text-[1.25rem] leading-tight">{w.line}</span>
              <span className="mt-1 text-[0.9375rem] leading-snug text-mute">{w.proof}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

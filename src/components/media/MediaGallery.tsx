"use client";

import { useMemo, useRef, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import type { MediaItem, MediaCategory } from "@/data/media";
import { MediaFrame } from "./MediaFrame";
import { Lightbox } from "./Lightbox";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { cn, pad2 } from "@/lib/utils";

export type ResolvedMedia = MediaItem & { expectedPath?: string };

// Asymmetric 12-column archive grid (2 columns on mobile).
const SPAN: Record<MediaItem["size"], string> = {
  hero: "col-span-2 row-span-2 md:col-span-8 md:row-span-5",
  tall: "col-span-1 row-span-2 md:col-span-4 md:row-span-5",
  wide: "col-span-2 row-span-1 md:col-span-6 md:row-span-3",
  square: "col-span-1 row-span-1 md:col-span-3 md:row-span-3",
};

const TINT: Record<MediaCategory, "sage" | "rose" | "stone" | "forest"> = {
  Speaking: "rose",
  Business: "sage",
  Leadership: "stone",
  Personal: "stone",
};

export function MediaGallery({ items }: { items: ResolvedMedia[] }) {
  const [filter, setFilter] = useState<MediaCategory | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const grid = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => ["All", ...(["Speaking", "Business", "Leadership", "Personal"] as const).filter((c) => items.some((i) => i.category === c))] as const,
    [items]
  );
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);
  const viewable = visible.filter((i) => i.type !== "link");

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", grid.current);
      gsap.set(tiles, { clipPath: "inset(100% 0% 0% 0%)" });
      ScrollTrigger.batch(tiles, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: window.innerWidth < 768 ? 0.9 : 1.5,
            ease: "expo.inOut",
            stagger: 0.1,
          }),
      });
    },
    { scope: grid }
  );

  const changeFilter = (c: MediaCategory | "All") => {
    setFilter(c);
    requestAnimationFrame(() => {
      if (!grid.current) return;
      const tiles = grid.current.querySelectorAll("[data-tile]");
      gsap.set(tiles, { clipPath: "inset(0% 0% 0% 0%)" });
      if (!reducedMotion()) gsap.fromTo(tiles, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" });
      ScrollTrigger.refresh();
    });
  };

  return (
    <>
      <div role="group" aria-label="Filter the archive" className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/15 lg:mt-20">
        {categories.map((c) => {
          const count = c === "All" ? items.length : items.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => changeFilter(c)}
              className={cn(
                "relative -mb-px flex min-h-12 items-baseline gap-1.5 border-b-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                filter === c ? "border-ink text-ink" : "border-transparent text-mute hover:text-ink"
              )}
            >
              {c}
              <sup className="text-[0.625rem] font-medium tabular-nums">{pad2(count)}</sup>
            </button>
          );
        })}
      </div>

      <div
        ref={grid}
        className="mt-8 grid grid-flow-dense auto-rows-[42vw] grid-cols-2 gap-2 md:auto-rows-[clamp(70px,7.2vw,130px)] md:grid-cols-12 md:gap-3"
      >
        {visible.map((item) => {
          const isLink = item.type === "link";
          const interactive = isLink ? Boolean(item.href) : true;
          const inner = (
            <>
              <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.045]">
                <MediaFrame
                  src={item.src}
                  alt={item.alt}
                  placeholderLabel={item.placeholderLabel}
                  expectedPath={isLink ? undefined : item.expectedPath}
                  sizes={item.size === "hero" || item.size === "wide" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                  theme={isLink ? "forest" : TINT[item.category]}
                  objectPosition={item.focus}
                  className="h-full w-full"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 max-md:opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-3 text-paper opacity-0 transition-all duration-500 max-md:translate-y-0 max-md:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-5">
                <span className="text-sm font-semibold">{item.title}</span>
                <span className="eyebrow">{isLink ? item.linkLabel : item.category}</span>
              </div>
              {item.type === "video" && (
                <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink md:right-5 md:top-5">
                  <Play className="h-4 w-4 translate-x-px" aria-hidden />
                </span>
              )}
              {isLink && item.href && <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-paper" aria-hidden />}
            </>
          );

          return (
            <figure key={item.id} data-tile className={cn("group relative overflow-hidden", SPAN[item.size])}>
              {!interactive ? (
                <div className="absolute inset-0">{inner}</div>
              ) : isLink ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" data-cursor="Open" className="absolute inset-0" aria-label={`${item.title} (${item.linkLabel ?? "link"}, opens in a new tab)`}>
                  {inner}
                </a>
              ) : (
                <button
                  type="button"
                  data-cursor={item.type === "video" ? "Play" : "View"}
                  onClick={() => setOpenId(item.id)}
                  className="absolute inset-0 text-left"
                  aria-label={`${item.type === "video" ? "Play video" : "View photo"}: ${item.title}`}
                >
                  {inner}
                </button>
              )}
              <figcaption className="sr-only">
                {item.title}: {item.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox items={viewable} openId={openId} onClose={() => setOpenId(null)} onChange={setOpenId} />
    </>
  );
}

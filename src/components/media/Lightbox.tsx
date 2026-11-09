"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ResolvedMedia } from "./MediaGallery";
import { MediaFrame } from "./MediaFrame";
import { getLenis } from "@/lib/animations/lenis-store";

/**
 * Full-screen viewer for photos and videos.
 * Keyboard: Esc closes, ←/→ navigate, focus is trapped and restored.
 * Videos never autoplay — they load with controls and the viewer chooses.
 */
export function Lightbox({
  items,
  openId,
  onClose,
  onChange,
}: {
  items: ResolvedMedia[];
  openId: string | null;
  onClose: () => void;
  onChange: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const index = items.findIndex((i) => i.id === openId);
  const item = index >= 0 ? items[index] : null;

  const go = (d: number) => {
    if (items.length < 2) return;
    onChange(items[(index + d + items.length) % items.length].id);
  };

  useEffect(() => {
    if (!item) return;
    returnFocus.current = document.activeElement as HTMLElement;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus());
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      returnFocus.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(item)]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialog.current) {
        const f = Array.from(dialog.current.querySelectorAll<HTMLElement>("button, video, iframe, a"));
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.45 }}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/[0.98] text-paper"
        >
          <div className="shell flex items-center justify-between py-5">
            <p className="eyebrow text-grey">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {item.category}
            </p>
            <button
              data-close
              type="button"
              onClick={onClose}
              className="flex h-11 items-center gap-3 text-sm"
              aria-label="Close viewer"
            >
              <span className="eyebrow hidden sm:inline">Close</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25">
                <X className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full max-h-[78vh] w-full max-w-6xl"
              >
                {item.type === "video" && item.embedUrl ? (
                  <iframe
                    src={item.embedUrl}
                    title={item.title}
                    allow="encrypted-media; picture-in-picture; fullscreen"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : item.type === "video" && item.video ? (
                  <video
                    src={item.video}
                    poster={item.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-contain"
                  >
                    <track kind="captions" />
                  </video>
                ) : item.src ? (
                  <Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-contain" />
                ) : (
                  <MediaFrame
                    alt={item.alt}
                    placeholderLabel={item.placeholderLabel}
                    expectedPath={item.type === "video" ? item.video ?? item.expectedPath : item.expectedPath}
                    sizes="90vw"
                    theme="forest"
                    className="absolute inset-0 border border-paper/10"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous"
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 bg-ink/60 md:left-6"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next"
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 bg-ink/60 md:right-6"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </>
            )}
          </div>

          <div className="shell flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:justify-between">
            <p className="t-head text-3xl">{item.title}</p>
            <p className="text-sm text-grey">
              {item.caption}
              {item.date ? ` · ${item.date}` : ""}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

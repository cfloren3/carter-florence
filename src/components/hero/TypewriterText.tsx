"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";

interface TypewriterTextProps {
  words: readonly string[];
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms to hold a completed word */
  pause?: number;
  /** ms before the first word starts typing (lets the intro finish) */
  startDelay?: number;
  className?: string;
  /** Prefix read by screen readers, e.g. "Carter is an". */
  srPrefix?: string;
  /** "bar" (thin line) or "block" (terminal-style). */
  caret?: "bar" | "block";
}

/**
 * Reusable typewriter.
 *  - No layout shift: every word is stacked invisibly in the same grid cell,
 *    so the box is always as wide as the longest word.
 *  - Accessible: the animated text is aria-hidden; screen readers get one
 *    static sentence listing every word — no letter-by-letter announcements.
 *  - Reduced motion: words crossfade slowly instead of typing.
 *  - Pauses when off-screen or when the tab is hidden.
 */
export function TypewriterText({
  words,
  typeSpeed = 85,
  deleteSpeed = 40,
  pause = 1900,
  startDelay = 0,
  className,
  srPrefix,
  caret = "bar",
}: TypewriterTextProps) {
  const [text, setText] = useState(words[0] ?? "");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [fadeIndex, setFadeIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Typing loop
  useEffect(() => {
    if (reduced || words.length === 0) return;
    let wordIndex = 0;
    let chars = words[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      if (!visible.current || document.hidden) {
        timer = setTimeout(step, 400);
        return;
      }
      const word = words[wordIndex];
      if (!deleting && chars === word.length) {
        deleting = true;
        timer = setTimeout(step, pause);
        return;
      }
      if (deleting && chars === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = setTimeout(step, 320);
        return;
      }
      chars += deleting ? -1 : 1;
      setText(words[wordIndex].slice(0, chars));
      // A touch of human irregularity while typing.
      const jitter = deleting ? 0 : Math.random() * 45;
      timer = setTimeout(step, (deleting ? deleteSpeed : typeSpeed) + jitter);
    };
    timer = setTimeout(step, startDelay + pause);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduced, words, typeSpeed, deleteSpeed, pause, startDelay]);

  // Reduced-motion crossfade
  useEffect(() => {
    if (!reduced) return;
    const t = setInterval(() => setFadeIndex((i) => (i + 1) % words.length), pause + 2000);
    return () => clearInterval(t);
  }, [reduced, words.length, pause]);

  const list = words.map((w) => w.replace(/\.$/, "")).join(", ");

  return (
    <span ref={ref} className={cn("relative inline-grid", className)}>
      <span className="sr-only">
        {srPrefix ? `${srPrefix} ` : ""}
        {list}.
      </span>
      {/* width reservers */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
          <span className="inline-block w-[0.08em]" />
        </span>
      ))}
      {reduced ? (
        words.map((w, i) => (
          <span
            key={w}
            aria-hidden
            className={cn(
              "col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-700",
              i === fadeIndex ? "opacity-100" : "opacity-0"
            )}
          >
            {w}
          </span>
        ))
      ) : (
        <span aria-hidden className="col-start-1 row-start-1 whitespace-nowrap">
          {text}
          <span
            className={cn(
              "caret ml-[0.06em] inline-block translate-y-[0.1em] bg-blush",
              caret === "block" ? "h-[1em] w-[0.55em]" : "h-[0.82em] w-[2px]"
            )}
          />
        </span>
      )}
    </span>
  );
}

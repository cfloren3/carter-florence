"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, reducedMotion, padMasks } from "@/lib/animations/gsap";

type SplitMode = "lines" | "words" | "chars";

interface SplitRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Split granularity — vary it between headings for rhythm. */
  by?: SplitMode;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Trigger on scroll (default) or immediately on mount. */
  onScroll?: boolean;
  id?: string;
}

/**
 * Masked text reveal: each line/word/char rises from behind an invisible mask.
 * Uses GSAP SplitText, which adds aria-label to the parent and hides the split
 * fragments from screen readers, so assistive tech reads the sentence once.
 * Text is fully present in the server HTML — it is only hidden by JS right
 * before it animates.
 */
export function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  by = "words",
  delay = 0,
  stagger,
  duration = 1.2,
  onScroll = true,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;
      const types = by === "chars" ? "lines,words,chars" : by === "words" ? "lines,words" : "lines";
      SplitText.create(ref.current, {
        type: types,
        mask: by,
        autoSplit: true,
        linesClass: "split-line",
        onSplit(self) {
          padMasks(self);
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 110,
            rotate: by === "lines" ? 0 : 2,
            duration,
            delay,
            ease: "expo.out",
            stagger: stagger ?? (by === "chars" ? 0.025 : by === "words" ? 0.05 : 0.1),
            scrollTrigger: onScroll
              ? { trigger: ref.current, start: "top 88%", once: true }
              : undefined,
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

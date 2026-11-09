"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

/**
 * Apple-style reading highlight: words start muted and darken in sequence,
 * scrubbed to scroll position. Text is fully dark without JS / reduced motion.
 */
export function ScrollHighlight({
  paragraphs,
  className,
  from = "#b8bab7",
  to = "#202321",
}: {
  paragraphs: readonly string[];
  className?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;
      const split = SplitText.create(ref.current.querySelectorAll("p"), { type: "words" });
      gsap.fromTo(
        split.words,
        { color: from },
        {
          color: to,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 52%", scrub: 0.6 },
        }
      );
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={cn("space-y-[0.9em]", className)}>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
    </div>
  );
}

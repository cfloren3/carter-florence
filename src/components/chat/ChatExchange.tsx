"use client";

import { useRef } from "react";
import type { Exchange } from "@/data/conversation";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

/**
 * One scripted Q&A, played back by scroll position:
 *   1. the visitor's question types itself out, character by character
 *   2. a typing indicator appears
 *   3. Carter's answer streams in word by word
 * Everything is real text in the HTML (indexable, screen-reader friendly);
 * JS only hides it right before playback. Reduced motion: shown complete.
 */
export function ChatExchange({ x, dark = false, className }: { x: Exchange; dark?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      const chars = SplitText.create(q("[data-q]"), { type: "chars" }).chars;
      const words = SplitText.create(q("[data-a] p"), { type: "words" }).words;
      const todo = q("[data-todo]");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom 50%", scrub: 0.5 },
      });
      tl.fromTo(q("[data-bubble]"), { autoAlpha: 0, y: 14, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" })
        .fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.001, stagger: { amount: 0.9 } })
        .fromTo(q("[data-from]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, "+=0.05")
        .fromTo(q("[data-dots]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, "<")
        .to(q("[data-dots]"), { autoAlpha: 0, duration: 0.1 }, "+=0.35");
      if (words.length) {
        tl.fromTo(words, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.06, stagger: { amount: 2.2 } }, "<");
      }
      if (todo.length) {
        tl.fromTo(todo, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "<");
      }
    },
    { scope: root }
  );

  return (
    <div ref={root} id={`q-${x.id}`} className={cn("scroll-mt-40", className)}>
      {/* visitor */}
      <div className="flex justify-end">
        <p
          data-bubble
          className={cn(
            "max-w-[88%] rounded-[1.4rem] rounded-br-md px-5 py-3.5 text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] md:text-[1.1875rem]",
            dark ? "bg-paper text-ink" : "bg-ink text-paper"
          )}
        >
          <span className="sr-only">Question: </span>
          <span data-q>{x.question}</span>
        </p>
      </div>

      {/* Carter */}
      <div className="mt-6 flex gap-3 md:gap-5">
        <span
          data-from
          aria-hidden
          className={cn(
            "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold tracking-[0.02em]",
            dark ? "bg-blush text-ink" : "bg-ink text-paper"
          )}
        >
          CF
        </span>
        <div className="relative min-w-0 flex-1">
          <p data-from className={cn("eyebrow mb-2", dark ? "text-grey" : "text-mute")}>
            Carter
          </p>
          <span data-dots aria-hidden className="invisible absolute left-0 top-8 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn("typing-dot h-2 w-2 rounded-full", dark ? "bg-paper/60" : "bg-ink/40")}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
          {x.answer ? (
            <div data-a className="space-y-4 text-[clamp(1.25rem,1.85vw,1.65rem)] font-medium leading-[1.36] tracking-[-0.022em]">
              <span className="sr-only">Answer: </span>
              {x.answer.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          ) : (
            <div
              data-todo
              className={cn(
                "border border-dashed px-4 py-3 text-[0.9375rem] leading-relaxed",
                dark ? "border-paper/30 text-paper/70" : "border-ink/30 text-mute"
              )}
            >
              <span className="eyebrow mb-1 block">Answer to be written</span>
              {x.todo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

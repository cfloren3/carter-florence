"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, reducedMotion, finePointer, padMasks } from "@/lib/animations/gsap";
import { scrollToTarget } from "@/lib/animations/lenis-store";
import { profile } from "@/data/profile";
import { TypewriterText } from "./TypewriterText";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Magnetic } from "@/components/animations/Magnetic";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/webgl/InView";
import { HeroParticles } from "@/components/webgl";

/**
 * OPENING — the whole person, not a crop.
 *
 * Load: particles gather in → the serif name rises letter by letter → the
 * full-length portrait is revealed by a scan line sweeping down its frame →
 * interface details and the terminal-style typewriter come online.
 *
 * Alive: letters of the name lean away from the cursor; the portrait tilts a
 * few degrees toward it; the particle field parts around the pointer.
 *
 * Scroll: the name's tracking opens out and fades (kinetic type) while the
 * portrait drifts up at a slower rate — then the conversation begins.
 */
export function CinematicHero({ portraitSrc, availability }: { portraitSrc?: string; availability: string | null }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      document.documentElement.classList.add("intro-done");
      if (reducedMotion()) return;

      const splits = q("[data-name]").map((el) => {
        const s = SplitText.create(el, { type: "chars", mask: "chars" });
        padMasks(s);
        return s;
      });
      const chars = splits.flatMap((s) => s.chars);

      // ---- load
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q("[data-kicker]"), { autoAlpha: 0, y: 10, duration: 0.8 }, 0.05)
        .from(chars, { yPercent: 115, duration: 1.5, stagger: 0.045 }, 0.15)
        .fromTo(q("[data-portrait]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power3.inOut" }, 0.35)
        .fromTo(q("[data-scan]"), { top: "0%", autoAlpha: 1 }, { top: "100%", duration: 1.7, ease: "power3.inOut" }, 0.35)
        .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.4 }, 2.0)
        .from(q("[data-portrait-img]"), { scale: 1.12, duration: 2.4 }, 0.35)
        .from(q("[data-corner]"), { autoAlpha: 0, scale: 0.6, duration: 0.8, stagger: 0.06 }, 1.4)
        .from(q("[data-fade]"), { autoAlpha: 0, y: 18, duration: 1.1, stagger: 0.08 }, 1.0);

      // ---- alive: cursor
      if (finePointer()) {
        const tilt = q("[data-tilt]")[0];
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3.out" });
        const charTo = chars.map((c) => ({
          el: c,
          y: gsap.quickTo(c, "y", { duration: 0.9, ease: "power3.out" }),
          x: gsap.quickTo(c, "x", { duration: 0.9, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rx(-ny * 5);
          ry(nx * 6);
          for (const c of charTo) {
            const r = c.el.getBoundingClientRect();
            const dx = r.left + r.width / 2 - e.clientX;
            const dy = r.top + r.height / 2 - e.clientY;
            const dist = Math.hypot(dx, dy);
            const f = Math.max(0, 1 - dist / 200);
            c.x((dx / (dist || 1)) * f * 3);
            c.y((dy / (dist || 1)) * f * 7);
          }
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    },
    { scope: root }
  );

  // ---- scroll (separate context so it runs alongside the pointer handler)
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 } })
          .to(q("[data-name-line='1']"), { letterSpacing: "0.12em", xPercent: -6, autoAlpha: 0.15 }, 0)
          .to(q("[data-name-line='2']"), { letterSpacing: "0.12em", xPercent: 4, autoAlpha: 0.15 }, 0)
          .to(q("[data-drift]"), { yPercent: -14 }, 0)
          .to(q("[data-out]"), { autoAlpha: 0, y: -30 }, 0);
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.to(q("[data-drift]"), {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  const askFocus = () => {
    scrollToTarget("#about", 0);
    window.setTimeout(() => document.getElementById("ask-input")?.focus({ preventScroll: true }), 1300);
  };

  return (
    <section ref={root} id="top" tabIndex={-1} aria-label="Introduction" className="relative overflow-hidden outline-none lg:h-[100svh] lg:min-h-[680px]">
      <InView className="absolute inset-0">
        <HeroParticles />
      </InView>

      <div className="shell relative grid grid-cols-12 gap-x-6 pb-12 pt-24 lg:h-full lg:pb-8 lg:pt-20">
        {/* LEFT — identity */}
        <div className="relative z-10 col-span-12 flex flex-col lg:col-span-7 lg:justify-between lg:py-6">
          <p data-kicker data-intro className="eyebrow flex items-center gap-3 text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-blush" aria-hidden />
            Biography · {profile.location}
          </p>

          <div className="mt-8 lg:mt-0">
            <h1 className="t-display text-[clamp(4.5rem,21vw,8rem)] leading-[0.86] sm:text-[clamp(6rem,16vw,10rem)] lg:text-[clamp(7rem,11.2vw,13.5rem)]">
              <span data-name-line="1" className="block">
                <span data-name data-intro className="block">
                  {profile.firstName}
                </span>
              </span>
              <span data-name-line="2" className="block lg:pl-[0.55em]">
                <span data-name data-intro className="block italic">
                  {profile.lastName}
                  <span className="not-italic text-blush">.</span>
                </span>
              </span>
            </h1>

            <div data-out className="mt-8 lg:mt-10">
              <p data-fade data-intro className="eyebrow flex items-center gap-2 text-[0.8125rem] normal-case tracking-[0.02em] text-ink">
                <span aria-hidden className="text-blush">›</span>
                <TypewriterText words={profile.roles} startDelay={1700} caret="block" />
              </p>
              <p data-fade data-intro className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink/80">
                Founder of Yardex Guelph. Studying International Relations at Western University, with Ivey AEO. Interested in
                finance, strategy and consulting.
              </p>
              <div data-fade data-intro className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Magnetic>
                  <button
                    type="button"
                    onClick={askFocus}
                    className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-[0.9375rem] font-medium text-paper"
                  >
                    Ask me anything
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/15">
                      <Arrow />
                    </span>
                  </button>
                </Magnetic>
                <a href="#contact" className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium">
                  <span className="link-line">Get in touch</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>

          <div data-out className="mt-10 hidden flex-wrap gap-x-8 gap-y-2 lg:flex">
            <p data-fade data-intro className="eyebrow text-mute">
              {profile.heroLine}
            </p>
            {availability && (
              <p data-fade data-intro className="eyebrow flex items-center gap-2 text-mute">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
                {availability}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — full-length portrait */}
        <div className="col-span-12 mt-12 lg:col-span-5 lg:mt-0 lg:flex lg:items-end lg:justify-end">
          <div data-drift className="mx-auto w-[86%] [perspective:1200px] sm:w-[64%] lg:mx-0 lg:h-[calc(100svh-8rem)] lg:w-auto">
            <figure data-tilt className="relative lg:h-full" style={{ aspectRatio: profile.portrait.aspect }}>
              <div data-portrait className="absolute inset-0 overflow-hidden">
                <div data-portrait-img className="absolute inset-0">
                  <MediaFrame
                    src={portraitSrc}
                    alt={profile.portrait.alt}
                    placeholderLabel="Portrait"
                    expectedPath={profile.portrait.src}
                    sizes="(min-width: 1024px) 40vw, 86vw"
                    priority
                    theme="stone"
                    objectPosition={profile.portrait.focus}
                    className="h-full w-full"
                  />
                </div>
                <span data-scan aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-paper opacity-0 shadow-[0_0_24px_6px_rgba(247,246,242,.8)]" />
              </div>
              {/* interface corner marks */}
              {["-left-3 -top-3 border-l border-t", "-right-3 -top-3 border-r border-t", "-bottom-3 -left-3 border-b border-l", "-bottom-3 -right-3 border-b border-r"].map((c) => (
                <span key={c} data-corner aria-hidden className={`absolute h-5 w-5 border-ink/50 ${c}`} />
              ))}
              <figcaption data-fade data-intro className="eyebrow absolute -bottom-9 left-0 right-0 flex justify-between text-mute">
                <span>Fig. 01 · Carter Florence</span>
                <span className="hidden sm:inline">{profile.location}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* mobile meta */}
        <div className="col-span-12 mt-16 flex flex-col gap-2 border-t border-ink/15 pt-4 lg:hidden">
          <p className="eyebrow text-mute">{profile.heroLine}</p>
          {availability && <p className="eyebrow text-mute">{availability}</p>}
        </div>
      </div>
    </section>
  );
}

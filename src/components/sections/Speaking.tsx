import { profile } from "@/data/profile";
import { Play } from "lucide-react";
import { resolveAsset } from "@/lib/assets";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { SpeakButton } from "./SpeakButton";

/**
 * On stage — the two largest rooms Carter has spoken to.
 * Figures as given by Carter; edit here.
 */
const TALKS = [
  {
    figure: "2,600+",
    event: "Ontario DECA Provincial Championships",
    detail: "As a Provincial Executive Officer.",
    img: { src: "/images/projects/deca/provincials-lectern.jpg", alt: "Carter Florence speaking at the Ontario DECA Provincial Championships", focus: "50% 45%" },
  },
  {
    figure: "900+",
    event: "Beyond Borders Evolve Gala",
    detail: "Alongside former Guelph mayor Cam Guthrie.",
    img: { src: "/images/projects/beyond-borders/evolve-lectern.jpg", alt: "Carter Florence at the lectern at the Beyond Borders Evolve Gala", focus: "45% 55%" },
  },
];

export function Speaking() {
  return (
    <section id="speaking" aria-labelledby="speaking-title" className="relative border-t border-ink/10 py-28 lg:py-40">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow className="text-ink">On stage</Eyebrow>
            <SplitReveal id="speaking-title" by="words" className="t-display mt-8 text-[clamp(3rem,7.5vw,7.5rem)]">
              The biggest <span className="italic">rooms.</span>
            </SplitReveal>
          </div>
          <Reveal className="flex flex-wrap items-center gap-3">
            {profile.speech && (
              <a
                href={profile.speech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-ink/25 px-5 py-3 text-[0.875rem] font-semibold transition-colors hover:bg-ink hover:text-paper"
              >
                <Play className="h-4 w-4" aria-hidden />
                {profile.speech.label}
              </a>
            )}
            <SpeakButton />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:mt-20 lg:gap-12">
          {TALKS.map((t) => (
            <figure key={t.event} className="flex flex-col">
              <ImageReveal>
                <MediaFrame
                  src={resolveAsset(t.img.src)}
                  alt={t.img.alt}
                  placeholderLabel={t.event}
                  expectedPath={t.img.src}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  theme="forest"
                  objectPosition={t.img.focus}
                  className="aspect-[16/10] w-full"
                />
              </ImageReveal>
              <figcaption className="mt-6 flex items-end justify-between gap-6 border-t border-ink/20 pt-5">
                <span>
                  <span className="block text-[1.0625rem] font-medium">{t.event}</span>
                  <span className="mt-1 block text-[0.9375rem] text-ink/70">{t.detail}</span>
                </span>
                <span className="t-display shrink-0 text-[clamp(3rem,5.5vw,5.5rem)]">{t.figure}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

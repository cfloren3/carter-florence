import { profile } from "@/data/profile";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { Reveal } from "@/components/animations/Reveal";
import { pad2 } from "@/lib/utils";
import { conversation } from "@/data/conversation";
import { ChatThread } from "@/components/chat/ChatThread";

/**
 * 06 — Now. Education and interests as an editorial spread, not a
 * LinkedIn entry. Interests respond quietly on hover: the hovered word turns
 * serif italic while the rest step back.
 */
export function Education() {
  const e = profile.education;
  return (
    <section id="now" aria-labelledby="now-title" className="relative bg-stone py-28 lg:py-44">
      <div className="shell">
        <Eyebrow index="05" className="text-ink">
          Now
        </Eyebrow>

        <div className="mt-10 grid grid-cols-12 gap-x-4 gap-y-14 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-8">
            <SplitReveal
              id="now-title"
              by="lines"
              className="t-display text-[clamp(3.5rem,9.6vw,10rem)] tracking-[-0.03em]"
            >
              Western
              <br />
              University
            </SplitReveal>
            <Reveal as="dl" stagger={0.08} className="mt-12 grid grid-cols-1 border-t border-ink/20 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Program", e.program],
                ["Business", e.business],
                ["Graduation", e.graduation],
                ["Award", e.award],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-ink/20 py-5 sm:border-b-0 sm:pr-6">
                  <dt className="eyebrow text-mute">{k}</dt>
                  <dd className="mt-2 text-[1.0625rem] font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal className="col-span-12 flex items-end lg:col-span-4">
            <p className="t-serif text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1]">“{profile.statement}”</p>
          </Reveal>
        </div>

        <ChatThread items={conversation.education} className="mx-auto mt-24 max-w-3xl lg:mt-32" />

        <div className="mt-24 lg:mt-32">
          <p className="eyebrow text-mute">Interests</p>
          <ul className="group/list mt-6 flex flex-wrap items-baseline gap-x-[0.35em] border-t border-ink/20 pt-6 text-[clamp(2.5rem,6.2vw,6.5rem)] leading-[1.02]">
            {profile.interests.map((it, i) => (
              <li
                key={it}
                className="group/item t-head flex items-baseline tracking-[-0.03em] transition-opacity duration-500 group-hover/list:opacity-25 hover:!opacity-100"
              >
                <sup className="eyebrow mr-1 text-[0.6875rem] tracking-[0.1em] text-mute">{pad2(i + 1)}</sup>
                <span className="transition-[font-family] group-hover/item:font-serif group-hover/item:font-normal group-hover/item:italic group-hover/item:tracking-[-0.02em]">
                  {it}
                </span>
                {i < profile.interests.length - 1 && <span aria-hidden className="ml-[0.2em] text-ink/25">/</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { contact } from "@/data/socials";
import { profile } from "@/data/profile";
import { conversation } from "@/data/conversation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { ChatThread } from "@/components/chat/ChatThread";
import { InView } from "@/components/webgl/InView";
import { MorphBlob } from "@/components/webgl";
import { ContactForm } from "./ContactForm";

/** 08 — Let's connect: the conversation ends with a real message form. */
export function Contact() {
  const direct = [
    contact.email && { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
    contact.linkedin && { k: "LinkedIn", v: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: contact.linkedin },
  ].filter(Boolean) as { k: string; v: string; href: string }[];

  return (
    <section id="contact" data-theme="dark" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink pb-24 pt-28 text-paper lg:pt-40">
      <div className="shell">
        <Eyebrow index="06" className="text-paper">
          Contact
        </Eyebrow>

        <div className="relative z-0 mt-10 flex items-end justify-between gap-6">
          <SplitReveal
            id="contact-title"
            by="chars"
            stagger={0.03}
            className="t-display relative z-10 text-[clamp(4.25rem,14vw,15rem)]"
          >
            Let’s
            <br />
            <span className="italic">connect</span>
            <span className="text-blush">.</span>
          </SplitReveal>
          <InView className="absolute -right-[6vw] -top-[8vw] h-[46vw] w-[46vw] opacity-60 lg:relative lg:right-auto lg:top-auto lg:h-[24vw] lg:w-[24vw] lg:shrink-0 lg:opacity-100">
            <MorphBlob />
          </InView>
        </div>

        <ChatThread items={conversation.contact} dark className="mx-auto mt-16 max-w-3xl lg:mt-20" />

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-16 border-t border-paper/15 pt-12 lg:mt-24 lg:gap-x-12 lg:pt-16">
          <div id="contact-form" className="col-span-12 scroll-mt-28 lg:col-span-7">
            <p className="eyebrow mb-8 text-grey">Send a note</p>
            <ContactForm email={contact.email} />
          </div>

          <Reveal stagger={0.08} className="col-span-12 flex flex-col lg:col-span-4 lg:col-start-9">
            <p className="eyebrow mb-4 text-grey">Or directly</p>
            {direct.map((r) => (
              <a
                key={r.k}
                href={r.href}
                {...(/^https?:/.test(r.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 border-t border-paper/15 py-5"
              >
                <span className="min-w-0">
                  <span className="eyebrow block text-grey">{r.k}</span>
                  <span className="mt-1 block truncate text-[1.125rem] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
                    {r.v}
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/25 transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
                  <Arrow />
                </span>
              </a>
            ))}
            <p className="eyebrow mt-6 border-t border-paper/15 pt-5 text-grey">{profile.location}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

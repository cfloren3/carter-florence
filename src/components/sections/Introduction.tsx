import { conversation } from "@/data/conversation";
import { projects } from "@/data/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChatThread } from "@/components/chat/ChatThread";

/** 01: Introduction. One quick "who are you", then straight to the work. */
export function Introduction() {
  const yardex = projects.find((p) => p.slug === "yardex-guelph");
  const press = projects.flatMap((p) => p.press ?? []);
  return (
    <section id="about" aria-label="Introduction" className="relative pb-16 pt-20 lg:pb-20 lg:pt-28">
      <div className="shell">
        <Eyebrow index="01" className="text-ink">
          Introduction
        </Eyebrow>
        <ChatThread items={conversation.intro} className="mx-auto mt-10 max-w-3xl lg:mt-12" />
        {press.length > 0 && (
          <p className="eyebrow mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 text-mute">
            <span>As featured in</span>
            {press.map((a) => (
              <a key={a.url} href={a.url} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                {a.outlet.split(",")[0]} ↗
              </a>
            ))}
            {yardex?.site && (
              <a href={yardex.site.url} target="_blank" rel="noopener noreferrer" className="link-line ml-auto text-ink">
                {yardex.site.label} ↗
              </a>
            )}
          </p>
        )}
      </div>
    </section>
  );
}

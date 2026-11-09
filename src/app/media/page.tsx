import Image from "next/image";
import { PageLayout, Section } from "@/components/page/PageLayout";
import { pageMetadata, abs } from "@/lib/seo";
import { media, mediaCategories } from "@/data/media";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { resolveAsset } from "@/lib/assets";

const description =
  "Photos of Carter Florence speaking at Ontario DECA and the Beyond Borders Evolve Gala, at work with Yardex Guelph and at DECA ICDC 2026, plus press coverage.";

export const metadata = pageMetadata({ path: "/media", title: "Media: Photos, Press & Speaking", description });

const INTRO: Record<string, string> = {
  Speaking: "On stage at the Ontario DECA Provincial Championships, the Beyond Borders Evolve Gala and DECA’s international conference in Atlanta.",
  Business: "Yardex Guelph at work, and the Ivey Business School offer.",
  Leadership: "The Beyond Borders and Ontario DECA teams.",
  Personal: "Off the clock.",
};

export default function MediaPage() {
  const items = media.map((m) => ({ ...m, src: resolveAsset(m.src) })).filter((m) => m.src);
  const press = projects.flatMap((p) => p.press ?? []);
  return (
    <PageLayout
      path="/media"
      schemaType="CollectionPage"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Media", path: "/media" },
      ]}
      eyebrow="Media"
      title={
        <>
          Photos, press <span className="italic">&amp; speaking</span>
        </>
      }
      lede={<p>A gallery of my work and the stages I’ve spoken on, plus articles that have been written about me.</p>}
      description={description}
      extraSchema={items.map((m) => ({
        "@type": "ImageObject",
        contentUrl: abs(m.src!),
        caption: `${m.title}: ${m.caption}`,
        description: m.alt,
      }))}
    >
      <Section id="press" title="Press coverage">
        <ul>
          {press.map((a) => (
            <li key={a.url}>
              <a href={a.url}>{a.title}</a>, {a.outlet} ({a.date})
            </li>
          ))}
        </ul>
        {profile.speech && (
          <p>
            Video: <a href={profile.speech.url}>{profile.speech.label}</a> (YouTube).
          </p>
        )}
      </Section>

      {mediaCategories.map((cat) => {
        const list = items.filter((m) => m.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} aria-labelledby={`g-${cat}`} className="border-t border-ink/15 py-12 lg:py-16">
            <h2 id={`g-${cat}`} className="t-head text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
              {cat}
            </h2>
            <p className="mt-3 max-w-xl text-mute">{INTRO[cat]}</p>
            <ul className="mt-8 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
                <li key={m.id}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                      <Image src={m.src!} alt={m.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" style={m.focus ? { objectPosition: m.focus } : undefined} />
                    </div>
                    <figcaption className="mt-3">
                      <span className="t-head block text-[1.25rem] leading-tight">{m.title}</span>
                      <span className="mt-1 block text-[0.9375rem] leading-snug text-mute">{m.caption}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </PageLayout>
  );
}

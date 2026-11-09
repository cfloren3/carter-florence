import Link from "next/link";
import Image from "next/image";
import { PageLayout, Section } from "@/components/page/PageLayout";
import { pageMetadata, orgLinks } from "@/lib/seo";
import { projects } from "@/data/projects";
import { resolveAsset } from "@/lib/assets";

const description =
  "Carter Florence founded Yardex Guelph at 13 and grew it into a lawn care company with 50 recurring properties, a four-person crew and a #2 Google ranking in Guelph.";

export const metadata = pageMetadata({ path: "/work/yardex-guelph", title: "Yardex Guelph Founder", description });

const yardex = projects.find((p) => p.slug === "yardex-guelph")!;

export default function YardexPage() {
  const photos = [yardex.cover, ...yardex.gallery].map((m) => ({ ...m, src: resolveAsset(m.src) })).filter((m) => m.src);
  return (
    <PageLayout
      path="/work/yardex-guelph"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Work", path: "/#work" },
        { name: "Yardex Guelph", path: "/work/yardex-guelph" },
      ]}
      eyebrow="Work · Founder · March 2022 to present"
      title={
        <>
          Yardex <span className="italic">Guelph</span>
        </>
      }
      lede={
        <p>
          The lawn care and property maintenance company I founded at 13 in Guelph, Ontario, and still run today. Looking for lawn care? Visit{" "}
          <a href={orgLinks.yardex} className="link-line text-ink">
            yardexguelph.ca
          </a>
          .
        </p>
      }
      description={description}
    >
      <div className="grid gap-3 pb-12 sm:grid-cols-3">
        {photos.map((m, i) => (
          <figure key={m.src} className={i === 0 ? "sm:col-span-3" : ""}>
            <div className={`relative overflow-hidden bg-stone ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
              <Image src={m.src!} alt={m.alt} fill sizes={i === 0 ? "100vw" : "(min-width: 640px) 33vw, 100vw"} className="object-cover" style={m.focus ? { objectPosition: m.focus } : undefined} priority={i === 0} />
            </div>
            <figcaption className="eyebrow mt-2 text-mute">{m.alt}</figcaption>
          </figure>
        ))}
      </div>

      <Section id="role" title="My role">
        <p>
          I’m the founder. I recruited and manage a four-person crew, and I own pricing, scheduling, customer service, finances, equipment, insurance and WSIB
          compliance for a fully insured business. I still get out on the lawns myself.
        </p>
        <ul>
          <li>$50,000 in annual revenue, $36,000 of it in recurring contracts.</li>
          <li>50 recurring properties across Guelph.</li>
          <li>1,000+ service visits delivered in 2026.</li>
        </ul>
      </Section>

      <Section id="growth" title="How I grew it">
        <p>
          I started with neighbours and grew mostly through Google and word of mouth. I taught myself SEO and built out the website and Google profile until Yardex
          ranked #2 on Google for lawn care in Guelph, with 50+ five-star reviews. Every holiday season, each weekly client gets a custom Yeti mug.
        </p>
        <p>
          To run it, I built <Link href="/entrepreneurship#traitcrm">TraitCRM</Link>, a CRM for scheduling, clients, billing, routing and our operating procedures.
          Read the whole story on the <Link href="/entrepreneurship">entrepreneurship page</Link>.
        </p>
      </Section>

      <Section id="recognition" title="Recognition">
        <ul>
          {yardex.awards?.map((a) => (
            <li key={a.title}>
              <strong>{a.title}</strong>
              {a.year ? ` (${a.year})` : ""}: {a.detail}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="press" title="In the press">
        <ul>
          {yardex.press?.map((a) => (
            <li key={a.url}>
              <a href={a.url}>{a.title}</a>, {a.outlet} ({a.date})
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}

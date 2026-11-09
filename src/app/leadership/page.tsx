import Link from "next/link";
import Image from "next/image";
import { PageLayout, Section } from "@/components/page/PageLayout";
import { pageMetadata, orgLinks } from "@/lib/seo";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { resolveAsset } from "@/lib/assets";

const description =
  "Carter Florence's leadership: Ontario DECA Provincial Executive Officer, Beyond Borders VP of Sales, 180 Degrees Consulting at Western, and speaking to 2,600+ and 900+ audiences.";

export const metadata = pageMetadata({ path: "/leadership", title: "Leadership: DECA, Beyond Borders & Western", description });

const deca = projects.find((p) => p.slug === "deca")!;
const western = projects.find((p) => p.slug === "western")!;

function Photo({ src, alt, focus }: { src: string; alt: string; focus?: string }) {
  const s = resolveAsset(src);
  if (!s) return null;
  return (
    <figure className="!mt-8">
      <div className="relative aspect-[16/9] overflow-hidden bg-stone">
        <Image src={s} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" style={focus ? { objectPosition: focus } : undefined} />
      </div>
      <figcaption className="eyebrow mt-2 text-mute">{alt}</figcaption>
    </figure>
  );
}

export default function LeadershipPage() {
  return (
    <PageLayout
      path="/leadership"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Leadership", path: "/leadership" },
      ]}
      eyebrow="Leadership"
      title={
        <>
          Leading <span className="italic">people</span>, on and off stage
        </>
      }
      lede={<p>From a provincial student organization to a 21-person sales team and four clubs at Western: what I led, and what changed because of it.</p>}
      description={description}
    >
      <Section id="deca" title="Ontario DECA Provincial Executive Officer">
        <p>{deca.explainer?.text}</p>
        <p>
          From May 2025 to June 2026 I was one of the 10 Provincial Executive Officers of <a href={orgLinks.deca}>Ontario DECA</a>, responsible for chapter
          engagement.
        </p>
        <ul>
          <li>
            Built Ontario DECA’s first centralized <strong>Resource Hub</strong>. 81.1% of returning members said it improved their access to chapter resources.
          </li>
          <li>Launched communications reaching nearly 18,000 members.</li>
          <li>Presented to 2,600+ attendees at the Provincial Championships in Toronto.</li>
          <li>
            Before the officer team: DECA chapter trainer in grade 10, then chapter president at Centennial CVI, when the chapter grew back to its pre-COVID size.
          </li>
          <li>
            Competing: Ontario Provincial Champion in Personal Financial Literacy (2024), and 7th worldwide in Entrepreneurship Team Decision Making at DECA’s
            International Career Development Conference in Atlanta (2026, team result).
          </li>
        </ul>
        <Photo src={deca.cover.src!} alt="Carter Florence speaking at the Ontario DECA Provincial Championships" focus={deca.cover.focus} />
      </Section>

      <Section id="beyond-borders" title="Beyond Borders, VP of Sales">
        <p>
          For the Beyond Borders Evolve Gala in Guelph I ran sales: a four-tier sponsorship strategy ($1,000 to $10,000), 3 managers and 18 sales representatives,
          and revenue forecasting with the CFO.
        </p>
        <ul>
          <li>$185,000 in corporate sponsorships in five weeks, 48% year-over-year growth (team result).</li>
          <li>#1 of 21 sellers, with $37,000 secured personally.</li>
          <li>The gala netted $255,000, including $63,750 for the Guelph Wish Fund for Children.</li>
          <li>Spoke to 900+ people at the gala alongside former Guelph mayor Cam Guthrie.</li>
        </ul>
        <Photo src="/images/projects/beyond-borders/carter-florence-evolve-gala-speaking.jpg" alt="Carter Florence speaking at the Beyond Borders Evolve Gala" focus="45% 52%" />
      </Section>

      <Section id="western" title="At Western University">
        <ul>
          {western.roles?.map((r) => (
            <li key={r.org}>
              <strong>
                {r.role}, {r.org === "180 Degrees Consulting" ? <a href={orgLinks.dc180}>{r.org}</a> : r.org}
              </strong>
              : {r.line}
            </li>
          ))}
        </ul>
        <p>
          At 180 Degrees Consulting I advise a nonprofit serving 7,000 families on modernizing its donor technology, comparing CRM platforms and custom software
          through workflow and cost-benefit analysis.
        </p>
      </Section>

      <Section id="speaking" title="Public speaking">
        <ul>
          <li>2,600+ attendees, Ontario DECA Provincial Championships.</li>
          <li>900+ guests, Beyond Borders Evolve Gala, alongside former Guelph mayor Cam Guthrie.</li>
        </ul>
        {profile.speech && (
          <p>
            <a href={profile.speech.url}>{profile.speech.label} on YouTube</a>.
          </p>
        )}
        <p>
          Interested in having me speak? <Link href="/#contact">Send a speaking invitation</Link>.
        </p>
      </Section>

      <Section id="teaching" title="Teaching">
        <p>
          From 2023 to 2026 I was a Specialized Aquatic Instructor with the City of Guelph, teaching and examining Bronze Medallion and Bronze Cross candidates with
          a 98.4% pass rate.
        </p>
      </Section>
    </PageLayout>
  );
}

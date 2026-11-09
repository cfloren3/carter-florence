import Link from "next/link";
import Image from "next/image";
import { PageLayout, Section } from "@/components/page/PageLayout";
import { pageMetadata, orgLinks } from "@/lib/seo";
import { profile } from "@/data/profile";
import { contact } from "@/data/socials";
import { resolveAsset } from "@/lib/assets";
import { BIO } from "@/data/bio";

const description =
  "About Carter Florence: a student entrepreneur from Guelph, Ontario, Centennial CVI graduate and Western University student with Ivey AEO. Founder of Yardex Guelph.";

export const metadata = pageMetadata({ path: "/about", title: "About Carter Florence | Student Entrepreneur, Guelph", description });

export default function AboutPage() {
  const portrait = resolveAsset(profile.portrait.src);
  return (
    <PageLayout
      path="/about"
      schemaType="AboutPage"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]}
      eyebrow="About"
      title={
        <>
          About Carter <span className="italic">Florence</span>
        </>
      }
      lede={<p>A student entrepreneur from Guelph, Ontario, studying at Western University with Ivey AEO, and the founder of Yardex Guelph.</p>}
      description={description}
    >
      <div className="grid grid-cols-12 gap-x-4 gap-y-10 pb-12 lg:gap-x-8">
        {portrait && (
          <figure className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="relative aspect-[1047/1605] overflow-hidden bg-stone">
              <Image src={portrait} alt="Carter Florence, student entrepreneur from Guelph, Ontario, in a grey suit" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: profile.portrait.focus }} />
            </div>
            <figcaption className="eyebrow mt-3 text-mute">Carter Florence · Guelph, Ontario</figcaption>
          </figure>
        )}
        <div className="prose-site col-span-12 lg:col-span-7 lg:col-start-6">
          <h2 className="t-head !mt-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-ink">Biography</h2>
          {BIO.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            Read more about <Link href="/entrepreneurship">his entrepreneurship</Link>, <Link href="/work/yardex-guelph">his role at Yardex Guelph</Link> and{" "}
            <Link href="/leadership">his leadership and speaking</Link>.
          </p>
        </div>
      </div>

      <Section id="education" title="Education">
        <h3>Western University and Ivey Business School</h3>
        <p>
          International Relations at <a href={orgLinks.western}>Western University</a> in London, Ontario, with Advanced Entry Opportunity (AEO) into the{" "}
          <a href={orgLinks.ivey}>Ivey Business School</a> HBA program. Recipient of a Western University Scholarship of Distinction. Expected graduation: 2030.
        </p>
        <h3>Centennial Collegiate Vocational Institute, Guelph</h3>
        <p>
          High school diploma from <a href={orgLinks.centennial}>Centennial CVI</a> in June 2026, with a 95% graduating average. At Centennial he was a DECA
          chapter trainer and then chapter president, placed 7th worldwide at the 2026 DECA International Career Development Conference, and was an Ontario
          Provincial Champion in Personal Financial Literacy in 2024.
        </p>
        <h3>International study</h3>
        <p>International business with MEI International Academy in New York, Germany, Switzerland and Italy (summer 2024).</p>
      </Section>

      <Section id="now" title="What he’s doing now">
        <ul>
          <li>Running Yardex Guelph and building TraitCRM.</li>
          <li>Consultant, 180 Degrees Consulting, advising a nonprofit on its donor technology.</li>
          <li>Director of Development, Pre-Business Students’ Network.</li>
          <li>Director of Sponsorships, Western Sales &amp; Marketing Club.</li>
          <li>Director of Finance, Western ACE.</li>
          <li>{profile.availability.label}, in finance, strategy, consulting or sales.</li>
        </ul>
      </Section>

      <Section id="facts" title="Quick facts">
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            ["Name", "Carter Florence"],
            ["Based in", "Guelph, Ontario, Canada"],
            ["Studying", "International Relations, Western University (Ivey AEO)"],
            ["High school", "Centennial Collegiate Vocational Institute"],
            ["Founder of", "Yardex Guelph (2022)"],
            ["Built", "TraitCRM"],
            ["Languages", "English, Spanish (limited working proficiency)"],
            ["Interests", profile.interests.join(", ")],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-ink/15 pt-3">
              <dt className="eyebrow text-mute">{k}</dt>
              <dd className="mt-1 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        {contact.linkedin && (
          <p>
            Professional profile: <a href={contact.linkedin}>Carter Florence on LinkedIn</a>.
          </p>
        )}
      </Section>
    </PageLayout>
  );
}

import Link from "next/link";
import { PageLayout, Section } from "@/components/page/PageLayout";
import { pageMetadata, orgLinks } from "@/lib/seo";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const description =
  "Carter Florence's entrepreneurial journey: founding Yardex Guelph at 13 while in school, growing it to 50 recurring properties, and building TraitCRM with Claude Code.";

export const metadata = pageMetadata({ path: "/entrepreneurship", title: "Student Entrepreneur in Guelph", description });

export default function EntrepreneurshipPage() {
  const press = projects.flatMap((p) => p.press ?? []);
  return (
    <PageLayout
      path="/entrepreneurship"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Entrepreneurship", path: "/entrepreneurship" },
      ]}
      eyebrow="Entrepreneurship"
      title={
        <>
          A student <span className="italic">founder</span> in Guelph
        </>
      }
      lede={
        <p>
          I started my first business at 13, in my own neighbourhood in Guelph, Ontario. I’ve been building, selling and fixing things ever since, while going to
          school full time.
        </p>
      }
      description={description}
    >
      <Section id="start" title="How it started">
        <p>
          In March 2022 I started <Link href="/work/yardex-guelph">Yardex Guelph</Link>, a lawn care company, while I was a student at Centennial CVI. I wanted to
          earn my own money, and I didn’t want to wait until I was older to start something. Lawn care was a business I could start with almost nothing. I named
          it, made business cards and built the first website myself.
        </p>
        <p>
          When <a href={press[0]?.url}>GuelphToday</a> wrote about it the next year, Yardex had five regular contracts with neighbours. Futurist Jim Carroll, who
          lived next door, wrote a post about it on his leadership blog: <a href={press[1]?.url}>10 leadership lessons from a 14-year-old CEO</a>.
        </p>
      </Section>

      <Section id="growth" title="How it grew">
        <p>
          Today Yardex does $50,000 a year, $36,000 of it in recurring contracts across 50 properties, with a four-person crew that delivered 1,000+ service visits
          in 2026. I handle the hiring, pricing, scheduling, finances, insurance and WSIB compliance.
        </p>
        <ul>
          <li>
            <strong>Marketing:</strong> I taught myself SEO and built out our website and Google profile until Yardex ranked #2 on Google for lawn care in Guelph,
            with 50+ five-star reviews.
          </li>
          <li>
            <strong>Retention:</strong> every holiday season, each weekly client gets a custom Yeti mug. Small things, done consistently, are why people stay.
          </li>
          <li>
            <strong>Recognition:</strong> a 2024 Quality Business Award, and a top-three Guelph lawn care company ranking from ThreeBest Rated in 2026.
          </li>
        </ul>
      </Section>

      <Section id="traitcrm" title="Building TraitCRM">
        <p>
          The big CRMs are built for sales teams at desks, and I was doing scheduling and billing in spreadsheets late at night. So I built my own:{" "}
          <a href={orgLinks.traitcrm}>TraitCRM</a>, a CRM for trade and service businesses. I built it with Claude Code, Anthropic’s AI coding tool, which let me
          go from a real problem on a real job to a working feature the next day.
        </p>
        <p>
          Each business gets its own private portal. The owner runs it from a laptop, and the crew signs in on their phones with a 6-digit code. It covers
          scheduling, clients and billing, a job timer, expenses and real profit. Yardex runs on it every day.
        </p>
      </Section>

      <Section id="lessons" title="What it taught me">
        {profile.philosophies.map((b) => (
          <div key={b.quote}>
            <h3>“{b.quote}”</h3>
            <p>{b.note}</p>
          </div>
        ))}
      </Section>

      <Section id="next" title="Where it’s going">
        <p>
          I’m now studying International Relations at Western University with Ivey AEO, because I want to understand how businesses work beyond one city. I still
          run Yardex and build TraitCRM, and I’m using what I learned selling sponsorships and running a crew in{" "}
          <Link href="/leadership">consulting and club leadership at Western</Link>.
        </p>
      </Section>
    </PageLayout>
  );
}

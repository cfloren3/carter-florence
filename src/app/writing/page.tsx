import Link from "next/link";
import { PageLayout, Section } from "@/components/page/PageLayout";
import { pageMetadata } from "@/lib/seo";
import { posts } from "@/data/writing";
import { projects } from "@/data/projects";

const description = "Articles by Carter Florence on entrepreneurship, student leadership, sales and business development.";

export const metadata = pageMetadata({ path: "/writing", title: "Writing", description, noindex: posts.length === 0 });

export default function WritingPage() {
  const press = projects.flatMap((p) => p.press ?? []);
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <PageLayout
      path="/writing"
      schemaType="CollectionPage"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Writing", path: "/writing" },
      ]}
      eyebrow="Writing"
      title={
        <>
          Notes from <span className="italic">building</span>
        </>
      }
      lede={<p>Articles on entrepreneurship, student leadership, sales and what I’m learning along the way.</p>}
      description={description}
    >
      {sorted.length > 0 ? (
        <ul className="grid gap-px bg-ink/10">
          {sorted.map((p) => (
            <li key={p.slug}>
              <Link href={`/writing/${p.slug}`} className="flex flex-col gap-2 bg-paper py-6 transition-colors hover:bg-stone/40">
                <span className="eyebrow text-mute">
                  {p.topic} · <time dateTime={p.published}>{p.published}</time>
                </span>
                <span className="t-head text-[1.75rem] leading-tight">{p.title}</span>
                <span className="text-mute">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Section id="soon" title="First articles coming soon">
          <p>I’m writing about starting a business at 13, selling sponsorships, and leading student organizations. In the meantime, here’s what others have written:</p>
          <ul>
            {press.map((a) => (
              <li key={a.url}>
                <a href={a.url}>{a.title}</a>, {a.outlet}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </PageLayout>
  );
}

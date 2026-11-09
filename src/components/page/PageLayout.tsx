import Link from "next/link";
import { breadcrumbNode, pageNode, personNode, websiteNode, yardexNode, JsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Every indexable sub-page, for breadcrumbs, "keep exploring" links and the sitemap. */
export const PAGES = [
  { path: "/about", name: "About", blurb: "Biography, education and what I’m working toward." },
  { path: "/entrepreneurship", name: "Entrepreneurship", blurb: "Starting a company at 13, and building the software it runs on." },
  { path: "/work/yardex-guelph", name: "Yardex Guelph", blurb: "My role founding and growing Yardex Guelph." },
  { path: "/leadership", name: "Leadership", blurb: "DECA, Beyond Borders, Western and public speaking." },
  { path: "/media", name: "Media", blurb: "Photos, press coverage and my speech." },
] as const;

/**
 * Shared shell for the sub-pages: visible breadcrumbs (plus BreadcrumbList
 * JSON-LD), one H1, an intro, the content, and links to the other pages.
 * Everything is server-rendered and readable without JavaScript.
 */
export function PageLayout({
  path,
  crumbs,
  eyebrow,
  title,
  lede,
  description,
  schemaType = "WebPage",
  extraSchema = [],
  children,
}: {
  path: string;
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  /** Plain-text page description (for structured data). */
  description: string;
  schemaType?: string;
  extraSchema?: object[];
  children: React.ReactNode;
}) {
  const name = crumbs[crumbs.length - 1].name;
  return (
    <>
      <JsonLd
        graph={[
          websiteNode(),
          personNode(),
          yardexNode(),
          pageNode({ type: schemaType, path, name: `${name} | Carter Florence`, description }),
          breadcrumbNode(crumbs),
          ...extraSchema,
        ]}
      />
      <article className="pb-24 pt-28 lg:pb-32 lg:pt-36">
        <header className="shell">
          <nav aria-label="Breadcrumb">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-mute">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.path} className="link-line text-ink">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow mt-12 text-mute">{eyebrow}</p>
          <h1 className="t-display mt-4 max-w-[16ch] text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]">{title}</h1>
          <div className="mt-8 max-w-2xl text-[1.1875rem] leading-relaxed text-ink/80 lg:text-[1.3125rem]">{lede}</div>
        </header>

        <div className="shell mt-16 lg:mt-24">{children}</div>

        <nav aria-label="Keep exploring" className="shell mt-24 border-t border-ink/15 pt-10 lg:mt-32">
          <p className="eyebrow text-mute">Keep exploring</p>
          <ul className="mt-6 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {[{ path: "/", name: "Home", blurb: "The full story, as a conversation." }, ...PAGES]
              .filter((p) => p.path !== path)
              .map((p) => (
                <li key={p.path}>
                  <Link href={p.path} className="group flex h-full flex-col gap-2 bg-paper p-5 transition-colors duration-500 hover:bg-stone/60">
                    <span className="t-head text-[1.5rem] leading-tight">
                      {p.name} <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-mute">{p.blurb}</span>
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/#contact" className="flex h-full flex-col gap-2 bg-ink p-5 text-paper">
                <span className="t-head text-[1.5rem] leading-tight">Get in touch →</span>
                <span className="text-[0.9375rem] leading-snug text-paper/70">Coffee chats, internships and speaking invitations.</span>
              </Link>
            </li>
          </ul>
        </nav>
      </article>
    </>
  );
}

/** A titled content section (H2) with an optional side label. */
export function Section({ id, title, children, className }: { id?: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className={cn("grid grid-cols-12 gap-x-4 gap-y-6 border-t border-ink/15 py-12 lg:gap-x-8 lg:py-16", className)}>
      <h2 id={id ? `${id}-h` : undefined} className="t-head col-span-12 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em] lg:col-span-4">
        {title}
      </h2>
      <div className="prose-site col-span-12 lg:col-span-8">{children}</div>
    </section>
  );
}

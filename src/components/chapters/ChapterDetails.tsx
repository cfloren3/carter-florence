import type { Project } from "@/data/projects";
import { Reveal } from "@/components/animations/Reveal";
import { ChatThread } from "@/components/chat/ChatThread";
import { SCOPE_LABEL } from "@/data/metrics";
import { cn } from "@/lib/utils";

/** Meta spec rows: Role / Period / Location. */
export function ChapterMeta({ p, dark }: { p: Project; dark?: boolean }) {
  const rows: [string, React.ReactNode][] = [
    ["Role", p.role],
    ...(p.period ? ([["Period", p.period]] as [string, React.ReactNode][]) : []),
    ...(p.location ? ([["Location", p.location]] as [string, React.ReactNode][]) : []),
    ...(p.site
      ? ([
          [
            "Website",
            <a key="site" href={p.site.url} target="_blank" rel="noopener noreferrer" className="link-line">
              {p.site.label} ↗
            </a>,
          ],
        ] as [string, React.ReactNode][])
      : []),
  ];
  return (
    <dl className={cn("border-t", dark ? "border-paper/15" : "border-ink/15")}>
      {rows.map(([k, v]) => (
        <div key={k} className={cn("flex items-baseline justify-between gap-6 border-b py-3", dark ? "border-paper/15" : "border-ink/15")}>
          <dt className={cn("eyebrow", dark ? "text-grey" : "text-mute")}>{k}</dt>
          <dd className="text-right text-[0.9375rem] font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };

/** Publicus-style figure grid. Organization-wide results are labelled. */
export function FactGrid({ p, dark, className }: { p: Project; dark?: boolean; className?: string }) {
  if (!p.facts.length) return null;
  return (
    <Reveal as="dl" stagger={0.07} className={cn("grid grid-cols-2 gap-px md:grid-cols-3", COLS[Math.min(p.facts.length, 5)], className)}>
      {p.facts.map((f) => (
        <div key={f.label} className={cn("flex flex-col gap-2 border-t pt-4 pr-4 pb-8", dark ? "border-paper/20" : "border-ink/20")}>
          <dd className="t-head order-1 text-[clamp(2.25rem,3.6vw,3.5rem)] tracking-[-0.02em]">{f.value}</dd>
          <dt className={cn("order-2 text-[0.875rem] leading-snug", dark ? "text-paper/75" : "text-ink/70")}>{f.label}</dt>
          {f.scope !== "individual" && (
            <span className={cn("eyebrow order-3 text-[0.5625rem]", dark ? "text-grey" : "text-mute")}>{SCOPE_LABEL[f.scope]}</span>
          )}
        </div>
      ))}
    </Reveal>
  );
}

/** Articles about the venture, linked out. */
export function PressList({ p, dark }: { p: Project; dark?: boolean }) {
  if (!p.press?.length) return null;
  return (
    <div>
      <p className={cn("eyebrow", dark ? "text-grey" : "text-mute")}>In the press</p>
      <ul className={cn("mt-4 grid gap-px md:grid-cols-2", dark ? "bg-paper/15" : "bg-ink/15")}>
        {p.press.map((a) => (
          <li key={a.url}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("group flex h-full flex-col gap-3 p-5 transition-colors duration-500 md:p-6", dark ? "bg-ink hover:bg-ink-soft" : "bg-paper hover:bg-stone/60")}
            >
              <span className={cn("eyebrow flex items-center justify-between gap-4", dark ? "text-grey" : "text-mute")}>
                <span>{a.outlet}</span>
                <span>{a.date}</span>
              </span>
              <span className="t-head text-[1.5rem] leading-[1.1] tracking-[-0.01em]">{a.title}</span>
              <span className="eyebrow mt-auto flex items-center gap-2">
                <span className="link-line">Read the article</span>
                <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Recognition / qualitative highlights. */
export function ChapterHighlights({ p, dark }: { p: Project; dark?: boolean }) {
  if (!p.highlights?.length) return null;
  return (
    <ul className={cn("mt-8 flex flex-col gap-2 text-[0.9375rem] leading-snug", dark ? "text-paper/80" : "text-ink/75")}>
      {p.highlights.map((h) => (
        <li key={h} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-blush" />
          {h}
        </li>
      ))}
    </ul>
  );
}

/** The chapter's conversation (scripted Q&A). */
export function ChapterChat({ p, dark }: { p: Project; dark?: boolean }) {
  return <ChatThread items={p.qa} dark={dark} />;
}

/** "01 / YARDEX" */
export function ChapterTag({ index, p, className }: { index: number; p: Project; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden className="h-px w-6 bg-current opacity-40" />
      <span>{p.tag}</span>
    </p>
  );
}

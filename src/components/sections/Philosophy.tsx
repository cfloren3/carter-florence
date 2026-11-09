import { ScrollHighlight } from "@/components/animations/ScrollHighlight";
import { Reveal } from "@/components/animations/Reveal";
import { pad2 } from "@/lib/utils";

/** A full-screen belief between two experience chapters. Words darken as you scroll. */
export function Philosophy({ quote, note, index, total }: { quote: string; note: string; index: number; total: number }) {
  return (
    <aside aria-label="What I believe" className="relative flex min-h-[60svh] items-center py-20 lg:min-h-[75svh]">
      <div className="shell w-full">
        <p className="eyebrow flex items-center gap-3 text-mute">
          <span>What I believe</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
          <span>
            {pad2(index + 1)} / {pad2(total)}
          </span>
        </p>
        <ScrollHighlight
          paragraphs={[`“${quote}”`]}
          className="t-display mt-8 max-w-[20ch] text-[clamp(2.75rem,7vw,7.5rem)] leading-[0.95] tracking-[-0.03em]"
        />
        <Reveal className="mt-10 max-w-md">
          <p className="flex gap-3 text-[1.0625rem] leading-snug text-mute">
            <span aria-hidden className="mt-[0.7em] h-px w-6 shrink-0 bg-blush" />
            {note}
          </p>
        </Reveal>
      </div>
    </aside>
  );
}

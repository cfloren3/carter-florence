import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Theme } from "@/data/types";

const TINT: Record<Theme, string> = {
  sage: "from-[#e3e6df] to-sage text-ink",
  rose: "from-[#efe4e3] to-blush text-ink",
  stone: "from-stone to-grey text-ink",
  forest: "from-ink-soft to-ink text-paper",
};

interface MediaFrameProps {
  /** Resolved src — pass `undefined` when the file doesn't exist yet. */
  src?: string;
  alt: string;
  placeholderLabel: string;
  /** Path the file is expected at — shown on the placeholder. */
  expectedPath?: string;
  sizes: string;
  theme?: Theme;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  /** Large faint glyph on placeholders (e.g. project number). */
  glyph?: string;
  /** Where the placeholder label sits — "top" when captions overlay the bottom. */
  labelAt?: "top" | "bottom";
  /** "contain" shows the whole photo (letterboxed on charcoal) — for very wide shots. */
  fit?: "cover" | "contain";
}

/**
 * Renders an optimised image, or — if the asset hasn't been supplied yet — a
 * designed, explicitly labelled placeholder. Placeholders never imitate real
 * photographs.
 */
export function MediaFrame({
  src,
  alt,
  placeholderLabel,
  expectedPath,
  sizes,
  theme = "stone",
  priority,
  className,
  imgClassName,
  objectPosition,
  glyph,
  labelAt = "bottom",
  fit = "cover",
}: MediaFrameProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", fit === "contain" ? "bg-ink" : "bg-stone", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(fit === "contain" ? "object-contain" : "object-cover", imgClassName)}
          style={objectPosition ? { objectPosition } : undefined}
          data-reveal-inner
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${placeholderLabel}`}
      className={cn("relative overflow-hidden bg-gradient-to-br", TINT[theme], className)}
    >
      <div data-reveal-inner className="absolute inset-0">
        {/* architectural guide lines */}
        <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.22]" preserveAspectRatio="none">
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="currentColor" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
          <line x1="38%" y1="0" x2="38%" y2="100%" stroke="currentColor" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="62%" x2="100%" y2="62%" stroke="currentColor" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
        </svg>
        {glyph && (
          <span
            aria-hidden
            className="t-display absolute -bottom-[0.06em] right-[0.06em] text-[clamp(6rem,20vw,18rem)] opacity-[0.1]"
          >
            {glyph}
          </span>
        )}
      </div>
      <div className={cn("absolute inset-x-0 flex flex-col gap-1 p-4 md:p-5", labelAt === "top" ? "top-16 md:top-20" : "bottom-0")}>
        <span className="eyebrow opacity-70">Placeholder · add photo</span>
        <span className="text-sm font-medium">{placeholderLabel}</span>
        {expectedPath && <code className="text-[0.6875rem] opacity-60">public{expectedPath}</code>}
      </div>
    </div>
  );
}

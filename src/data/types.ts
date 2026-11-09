/**
 * Shared content types.
 */

/** A photo/video slot. If `src` doesn't exist in /public yet, a labelled placeholder renders instead. */
export interface MediaAsset {
  /** Path inside /public (e.g. "/images/projects/yardex/crew.jpg") or an absolute URL. */
  src?: string;
  /** Required for real images — describe what is in the photo. */
  alt: string;
  /** Shown inside the placeholder so you know what to shoot / supply. */
  placeholderLabel: string;
  caption?: string;
  /** Optional CSS object-position for crops, e.g. "68% 40%". */
  focus?: string;
}

/**
 * A case-study section is either written content (one string per paragraph)
 * or a `todo` prompt rendered as a clearly marked editorial placeholder.
 */
export type CaseSection = { paragraphs: string[] } | { todo: string };

export type Theme = "sage" | "rose" | "stone" | "forest";

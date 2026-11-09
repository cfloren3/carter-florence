/**
 * "IN THE FRAME", media archive.
 * ------------------------------------------------------------------
 * Add a photo: put it in /public/images/... and add an entry below.
 * Videos: `type: "video"` with `video: "/videos/clip.mp4"` (src = poster),
 * or `embedUrl` for YouTube/Vimeo. Links (articles, interviews, posts):
 * `type: "link"` + `href`.
 *
 * `size` sets the tile in the 12-column grid, keep each row adding to 12:
 *   hero 8×5 · tall 4×5 · wide 6×3 · square 3×3
 * Current rows: hero+tall · tall×3 · wide×2 · wide×2 · tall×3 · wide×2 · square×4
 */

export type MediaCategory = "Speaking" | "Business" | "Leadership" | "Personal";

export interface MediaItem {
  id: string;
  type: "image" | "video" | "link";
  category: MediaCategory;
  title: string;
  caption: string;
  date?: string;
  src?: string;
  alt: string;
  video?: string;
  embedUrl?: string;
  href?: string;
  linkLabel?: string;
  size: "hero" | "tall" | "wide" | "square";
  placeholderLabel: string;
  focus?: string;
}

export const mediaCategories: MediaCategory[] = ["Speaking", "Business", "Leadership", "Personal"];

export const media: MediaItem[] = [
  // row 1, hero + tall
  {
    id: "provincials-lectern",
    type: "image",
    category: "Speaking",
    title: "Ontario DECA Provincials",
    caption: "Presenting to 2,600+ attendees at the Provincial Championships.",
    src: "/images/projects/deca/provincials-lectern.jpg",
    alt: "Carter Florence speaking at the lectern at the Ontario DECA Provincial Championships",
    size: "hero",
    placeholderLabel: "Speaking, Provincials",
  },
  {
    id: "evolve-lectern",
    type: "image",
    category: "Speaking",
    title: "Evolve Gala",
    caption: "Speaking to 900+ at the Evolve Gala.",
    src: "/images/projects/beyond-borders/evolve-lectern.jpg",
    alt: "Carter Florence at the Beyond Borders lectern during the Evolve Gala, seen from the balcony",
    size: "tall",
    placeholderLabel: "Speaking, Evolve Gala",
    focus: "45% 55%",
  },
  // row 2, three talls
  {
    id: "icdc-atlanta",
    type: "image",
    category: "Speaking",
    title: "ICDC 2026",
    caption: "DECA’s International Career Development Conference, Atlanta.",
    src: "/images/projects/deca/icdc-atlanta.jpg",
    alt: "The DECA ICDC 2026 opening session in a stadium in Atlanta",
    size: "tall",
    placeholderLabel: "ICDC, Atlanta",
  },
  {
    id: "evolve-stage",
    type: "image",
    category: "Leadership",
    title: "Evolve Gala",
    caption: "The Beyond Borders cast on stage.",
    src: "/images/projects/beyond-borders/evolve-stage.jpg",
    alt: "The Beyond Borders Evolve Gala cast on stage under the Evolve logo",
    size: "tall",
    placeholderLabel: "Leadership, Evolve stage",
  },
  {
    id: "golf",
    type: "image",
    category: "Personal",
    title: "On the green",
    caption: "Off the clock.",
    src: "/images/media/golf.jpg",
    alt: "Carter Florence lining up a putt on a golf course",
    size: "tall",
    placeholderLabel: "Personal",
  },
  // row 3, two wides
  {
    id: "wish-fund",
    type: "image",
    category: "Leadership",
    title: "Guelph Wish Fund",
    caption: "$63,750 from Beyond Borders to the Guelph Wish Fund for Children.",
    src: "/images/projects/beyond-borders/wish-fund-cheque.jpg",
    alt: "Carter Florence and two teammates holding a $63,750 Beyond Borders cheque to the Guelph Wish Fund for Children",
    size: "wide",
    placeholderLabel: "Leadership, cheque",
  },
  {
    id: "bb-team",
    type: "image",
    category: "Leadership",
    title: "Beyond Borders",
    caption: "The team at the Evolve Gala.",
    src: "/images/projects/beyond-borders/team.jpg",
    alt: "The Beyond Borders team in black shirts at the Evolve Gala",
    size: "wide",
    placeholderLabel: "Leadership, team",
  },
  // row 4, two wides
  {
    id: "officers-stage",
    type: "image",
    category: "Speaking",
    title: "Provincial officers",
    caption: "Ontario DECA’s Provincial Executive Officers on stage.",
    src: "/images/projects/deca/officers-stage.jpg",
    alt: "Carter Florence on stage with Ontario DECA’s Provincial Executive Officers",
    size: "wide",
    placeholderLabel: "Provincial officers",
    focus: "30% 40%",
  },
  {
    id: "provincials-stage",
    type: "image",
    category: "Speaking",
    title: "The officer team",
    caption: "Ontario DECA’s Provincial Executive Officers at Provincials.",
    src: "/images/projects/deca/provincials-stage.jpg",
    alt: "Carter Florence at the lectern with the Ontario DECA officer team standing on stage",
    size: "wide",
    placeholderLabel: "Speaking, Provincials stage",
  },
  // row 5, three talls
  {
    id: "yardex-edging",
    type: "image",
    category: "Business",
    title: "Yardex",
    caption: "Edging a client property in Guelph.",
    src: "/images/projects/yardex/edging.jpg",
    alt: "Carter Florence edging a lawn in a Yardex shirt",
    size: "tall",
    placeholderLabel: "Yardex",
    focus: "50% 45%",
  },
  {
    id: "officers-team",
    type: "image",
    category: "Leadership",
    title: "The officer team",
    caption: "Ontario DECA’s officer team, 2025–26.",
    src: "/images/projects/deca/officers-team.jpg",
    alt: "Ontario DECA’s Provincial Executive Officers standing together outdoors",
    size: "tall",
    placeholderLabel: "The officer team",
    focus: "50% 55%",
  },
  {
    id: "evolve-circle",
    type: "image",
    category: "Leadership",
    title: "Evolve Gala",
    caption: "The cast after the show.",
    src: "/images/projects/beyond-borders/evolve-circle.jpg",
    alt: "The Beyond Borders Evolve Gala cast in a circle on stage under blue lights",
    size: "tall",
    placeholderLabel: "Evolve Gala",
    focus: "50% 70%",
  },
  // row 6, two wides
  {
    id: "yardex-lawn",
    type: "image",
    category: "Business",
    title: "Yardex",
    caption: "A finished Yardex lawn.",
    src: "/images/projects/yardex/cover.jpg",
    alt: "A freshly striped, edged front lawn maintained by Yardex",
    size: "wide",
    placeholderLabel: "Yardex",
  },
  {
    id: "lectern",
    type: "image",
    category: "Speaking",
    title: "At the lectern",
    caption: "Speaking on a DECA stage.",
    src: "/images/projects/deca/cover.jpg",
    alt: "Carter Florence speaking at a lectern on a DECA stage",
    size: "wide",
    placeholderLabel: "Speaking, lectern",
    focus: "69% 45%",
  },
  // row 7, four squares
  {
    id: "icdc-medals",
    type: "image",
    category: "Speaking",
    title: "ICDC 2026",
    caption: "7th worldwide, on stage with the medalists.",
    src: "/images/projects/deca/icdc-medals.jpg",
    alt: "Carter Florence on stage with other medalists at ICDC 2026",
    size: "square",
    placeholderLabel: "ICDC, medals",
    focus: "50% 45%",
  },
  {
    id: "ivey-offer",
    type: "image",
    category: "Business",
    title: "Ivey HBA",
    caption: "The offer: Advanced Entry Opportunity into Ivey.",
    src: "/images/education/ivey-offer.jpg",
    alt: "The Ivey Business School offer page congratulating Carter",
    size: "square",
    placeholderLabel: "Ivey offer",
    focus: "50% 40%",
  },
  {
    id: "yardex-oak",
    type: "image",
    category: "Business",
    title: "Yardex",
    caption: "Under the oak.",
    src: "/images/projects/yardex/oak-lawn.jpg",
    alt: "A finished Yardex front lawn under a large oak tree",
    size: "square",
    placeholderLabel: "Yardex",
    focus: "50% 60%",
  },
  {
    id: "bb-hoodie",
    type: "image",
    category: "Personal",
    title: "Beyond Borders",
    caption: "Wearing the Beyond Borders colours.",
    src: "/images/projects/beyond-borders/cover.jpg",
    alt: "Carter Florence sitting outdoors in a yellow Beyond Borders hoodie",
    size: "square",
    placeholderLabel: "Personal",
    focus: "50% 40%",
  },
];

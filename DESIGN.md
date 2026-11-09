# Design analysis & direction — v2 "Digital biography"

## Why v1 felt like a template
- Every section followed the same recipe: numbered label → serif headline → hairline grid → fade-in.
- The hero was a static composition; scrolling simply moved to the next block.
- Metrics were laid out as a report grid, which reads like a statistics slide, not a story.
- Projects were alternating image/text rows, the most common portfolio pattern there is.
- One typeface family (serif) carried everything, so nothing had real contrast.

## What the references do best (inspected live, desktop + mobile)
| Reference | Strongest elements | Taken into v2 |
|---|---|---|
| **Apple** (40%) | Full-bleed panels, one idea per screen, centred tight sans headlines, hard light/dark contrast, scroll-driven product reveals | Pinned cinematic hero where the portrait grows to full-bleed; pinned "spec reveal" numbers on charcoal; one idea per viewport; tight grotesk headlines |
| **Hormozi / Acquisition** (30%) | Biography told chronologically, sticky "click to navigate" chapter index, achievements embedded inside the story, compact figure row, press section | "The Story So Far": sticky year + photo column with a clickable chapter index; facts inside each chapter; "In the Frame" archive |
| **FoundFirst** (15%) | Plain, confident headlines; calm nav; generous spacing; real work shown large | Restraint: short copy, text links instead of pill buttons, minimal navigation |
| **Publicus** (15%) | Numbered eyebrow labels ("02 · THE PLATFORM"), crisp data panels, large figures with tiny labels | Spec-table info design for facts and the 180DC scope; precise monospaced-feel metadata |

## Direction
- **Type:** Inter Tight (tight, Apple-like grotesk) for structure and the name; Instrument Serif *italic* only for single emotive words and the typewriter. Contrast comes from weight and scale, not decoration.
- **Colour:** warm white `#F7F6F2`, stone `#E6E4DE`, charcoal `#202321` for the dramatic moments (numbers, DECA, contact), sage `#9CA89B` and grey `#B8BAB7` for detail, blush `#D6B5B4` as a single accent (the full stop in the name, the active marker).
- **Motion:** each section gets its own move. Hero: portrait expands to full-bleed while the name splits apart. Intro: words darken as you read. Numbers: digits roll in during a pinned sequence. Yardex: frame → full-width. Beyond Borders: sticky figure with a parallax collage. DECA: pinned photo sequence. 180DC: spec lines that draw in. Story: sticky year that rolls between chapters.
- **No Three.js:** there's no subject that benefits from real 3D (no product, no data volume). Adding it would be decoration; the brief asks for 3D only when genuinely beneficial.
- **Mobile:** pins are replaced by native-scroll versions of the same story, with the same order and content.

/**
 * "THE STORY SO FAR": interactive biography.
 * ------------------------------------------------------------------
 * Dates and facts from Carter_Florence_Resume_Final.pdf (October 2026).
 * Desktop: the year and photo stay pinned and change with each chapter.
 * `confirm: true` shows a "to confirm" marker while site.showPlaceholders is on.
 */

import type { MediaAsset } from "./types";

export interface StoryEntry {
  year: string;
  title: string;
  story: string;
  image: MediaAsset;
  confirm?: boolean;
}

export const story: StoryEntry[] = [
  {
    year: "2022",
    title: "Started Yardex.",
    story:
      "At 13, I started Yardex, a lawn care company in Guelph. It grew into $50,000 a year, 50 recurring properties and a four-person crew, with a 2024 Quality Business Award along the way.",
    image: {
      src: "/images/projects/yardex/edging.jpg",
      alt: "Carter Florence edging a lawn in a Yardex shirt",
      focus: "50% 45%",
      placeholderLabel: "2022, early Yardex photo",
    },
  },
  {
    year: "2025",
    title: "Ontario DECA Provincial Executive Officer.",
    story:
      "After years as a chapter trainer and then chapter president, I was selected as one of 10 Provincial Executive Officers for Ontario DECA. I led chapter engagement, built the province’s first Resource Hub and spoke to 2,600+ at Provincials.",
    image: {
      src: "/images/projects/deca/provincials-lectern.jpg",
      alt: "Carter Florence speaking at the Ontario DECA Provincial Championships",
      placeholderLabel: "2025, DECA Provincials",
      focus: "48% 50%",
    },
  },
  {
    year: "2025",
    title: "VP of Sales, Evolve Gala.",
    story:
      "That November I took on sales for Beyond Borders’ Evolve Gala and led 21 sellers to $185,000 in five weeks. I was #1 of 21 with $37,000, and spoke to 900+ at the gala alongside former Guelph mayor Cam Guthrie.",
    image: {
      src: "/images/projects/beyond-borders/team.jpg",
      alt: "The Beyond Borders team at the Evolve Gala",
      placeholderLabel: "2025, Beyond Borders team",
    },
  },
  {
    year: "2026",
    title: "7th worldwide at ICDC.",
    story:
      "In 2026 I placed 7th worldwide in Entrepreneurship Team Decision Making at DECA’s International Career Development Conference in Atlanta, and graduated from Centennial CVI with a 95% average.",
    image: {
      src: "/images/projects/deca/icdc-atlanta.jpg",
      alt: "The DECA ICDC 2026 opening session in a stadium in Atlanta",
      placeholderLabel: "2026, ICDC Atlanta",
      focus: "50% 40%",
    },
  },
  {
    year: "2026",
    title: "Western University & Ivey AEO.",
    story:
      "I began International Relations at Western University with Advanced Entry Opportunity into the Ivey Business School and a Western University Scholarship of Distinction.",
    image: {
      src: "/images/education/ivey-offer.jpg",
      alt: "The Ivey Business School offer page congratulating Carter",
      placeholderLabel: "2026, Ivey offer",
      focus: "50% 45%",
    },
  },
  {
    year: "2026",
    title: "Consulting, clubs & building.",
    story:
      "At Western I joined 180 Degrees Consulting, the Pre-Business Students’ Network, the Sales & Marketing Club and Western ACE. On the side, I keep building TraitCRM, the software Yardex runs on.",
    image: {
      src: "/images/media/golf.jpg",
      alt: "Carter Florence lining up a putt on a golf course",
      placeholderLabel: "2026, photo",
      focus: "55% 55%",
    },
  },
];

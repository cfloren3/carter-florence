/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Global settings used for SEO, metadata and sitemap generation.
 *
 * ⚠️  Before launch: set `url` to the real production domain. It is used
 *     for canonical URLs, Open Graph images and the sitemap.
 */

export interface SiteConfig {
  /** Production URL, no trailing slash. */
  url: string;
  /** Default <title> for the homepage. */
  title: string;
  /** Template applied to every other page title. `%s` = page title. */
  titleTemplate: string;
  description: string;
  locale: string;
  /** Keywords help a little with discoverability; keep them honest. */
  keywords: string[];
  /**
   * When `true`, labelled placeholders (missing photos, unwritten case-study
   * sections, missing contact links) are rendered so you can see where content
   * belongs. Set to `false` to hide placeholder-only media tiles in production.
   */
  showPlaceholders: boolean;
}

export const site: SiteConfig = {
  url: "https://carterflorence.com", // TODO: confirm production domain
  title:
    "Carter Florence | Entrepreneur, Western University Student & Aspiring Strategist",
  titleTemplate: "%s | Carter Florence",
  description:
    "Explore the experience, projects, and leadership journey of Carter Florence, a Western University student and entrepreneur interested in consulting, finance, and strategy.",
  locale: "en_CA",
  keywords: [
    "Carter Florence",
    "Western University",
    "Ivey Business School",
    "Ivey AEO",
    "International Relations",
    "Yardex Guelph",
    "DECA Ontario",
    "Beyond Borders",
    "180 Degrees Consulting",
    "consulting internship",
    "finance internship",
    "strategy",
    "entrepreneur",
  ],
  showPlaceholders: true,
};

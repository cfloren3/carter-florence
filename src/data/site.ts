/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Global settings used for SEO, metadata and sitemap generation.
 *
 * `url` is the production domain. It is used for canonical URLs, Open Graph
 * images, structured data and the sitemap.
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
  /** Google Search Console HTML-tag token (only needed for a URL-prefix property). */
  googleSiteVerification: string | null;
}

export const site: SiteConfig = {
  url: "https://carterflorence.com",
  title: "Carter Florence | Entrepreneur & Western University Student",
  titleTemplate: "%s | Carter Florence",
  description:
    "Carter Florence is a student entrepreneur from Guelph, Ontario, studying at Western University (Ivey AEO). Founder of Yardex Guelph and former Ontario DECA Provincial Officer.",
  locale: "en_CA",
  keywords: [
    "Carter Florence",
    "Carter Florence Guelph",
    "Carter Florence Western University",
    "Carter Florence Yardex",
    "Carter Florence DECA",
    "Yardex Guelph founder",
    "student entrepreneur Guelph",
    "Western University student entrepreneur",
    "Ivey AEO",
    "Centennial CVI",
  ],
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null,
  showPlaceholders: false,
};

/**
 * WRITING: Carter's own articles.
 * ------------------------------------------------------------------
 * Add a post here to publish it at /writing/<slug>. Only publish real,
 * original writing. While this list is empty, /writing is `noindex` and
 * left out of the sitemap, so search engines never see a thin page.
 *
 * `body`: one string per paragraph. Lines starting with "## " become headings.
 */

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2027-01-15" */
  published: string;
  updated?: string;
  topic: "Entrepreneurship" | "Leadership" | "Sales" | "Student life";
  body: string[];
}

export const posts: Post[] = [];

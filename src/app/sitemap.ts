export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { PAGES } from "@/components/page/PageLayout";
import { posts } from "@/data/writing";

/** Every indexable page. /writing is added once it has a first article. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...PAGES.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...(posts.length
      ? [
          { url: `${site.url}/writing`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
          ...posts.map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: new Date(p.updated ?? p.published), priority: 0.6 })),
        ]
      : []),
  ];
}

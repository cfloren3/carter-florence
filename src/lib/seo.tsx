/**
 * SEO helpers: per-page metadata, and Schema.org JSON-LD that describes only
 * what is visible on the site. One Person entity (`#person`) is referenced
 * from every page so search engines connect all pages to the same individual.
 */
import type { Metadata } from "next";
import { site } from "@/data/site";
import { profile } from "@/data/profile";
import { contact } from "@/data/socials";
import { projects } from "@/data/projects";

export const abs = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  yardex: `${site.url}/#yardex-guelph`,
};

/** Official / verified URLs used for internal-to-external authority links. */
export const orgLinks = {
  centennial: "https://www.ugdsb.ca/ccvi/",
  western: "https://www.uwo.ca",
  ivey: "https://www.ivey.uwo.ca",
  deca: "https://deca.ca",
  dc180: "https://180dc.org",
  yardex: "https://www.yardexguelph.ca",
  traitcrm: "https://traitcrm.com",
};

/** Page metadata with canonical, Open Graph and Twitter tags. */
export function pageMetadata({
  path,
  title,
  description,
  noindex,
}: {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  // Titles already containing the name are used as-is; others get " | Carter Florence".
  const full = title.includes(profile.fullName) ? title : `${title} | ${profile.fullName}`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.fullName}, student entrepreneur from Guelph, Ontario` };
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: { type: "profile", url: path, title: full, description, siteName: profile.fullName, locale: site.locale, images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const yardex = projects.find((p) => p.slug === "yardex-guelph");
const press = projects.flatMap((p) => p.press ?? []);

/** The Person entity. Every fact here is shown somewhere on the site. */
export function personNode() {
  const role = (name: string, url: string | undefined, roleName: string, startDate: string, endDate?: string) => ({
    "@type": "OrganizationRole",
    memberOf: { "@type": "Organization", name, ...(url ? { url } : {}) },
    roleName,
    startDate,
    ...(endDate ? { endDate } : {}),
  });
  return {
    "@type": "Person",
    "@id": ids.person,
    name: profile.fullName,
    givenName: profile.firstName,
    familyName: profile.lastName,
    url: site.url,
    image: abs(profile.portrait.src),
    description: site.description,
    jobTitle: "Founder, Yardex Guelph",
    worksFor: { "@id": ids.yardex },
    homeLocation: {
      "@type": "Place",
      name: "Guelph, Ontario, Canada",
      address: { "@type": "PostalAddress", addressLocality: "Guelph", addressRegion: "ON", addressCountry: "CA" },
    },
    alumniOf: {
      "@type": "HighSchool",
      name: "Centennial Collegiate Vocational Institute",
      url: orgLinks.centennial,
      address: { "@type": "PostalAddress", addressLocality: "Guelph", addressRegion: "ON", addressCountry: "CA" },
    },
    affiliation: [
      { "@type": "CollegeOrUniversity", name: "Western University", url: orgLinks.western },
      { "@type": "CollegeOrUniversity", name: "Ivey Business School", url: orgLinks.ivey },
    ],
    memberOf: [
      role("180 Degrees Consulting", orgLinks.dc180, "Consultant", "2026-09"),
      role("Pre-Business Students’ Network", undefined, "Director of Development", "2026-09"),
      role("Western Sales & Marketing Club", undefined, "Director of Sponsorships", "2026-09"),
      role("Western ACE", undefined, "Director of Finance", "2026-09"),
      role("Ontario DECA", orgLinks.deca, "Provincial Executive Officer, Chapter Engagement", "2025-05", "2026-06"),
      role("Beyond Borders, Evolve Gala", undefined, "Vice President of Sales", "2025-11", "2026-01"),
    ],
    award: [
      "7th worldwide, Entrepreneurship Team Decision Making, DECA ICDC 2026",
      "Ontario DECA Provincial Champion, Personal Financial Literacy (2024)",
      "Western University Scholarship of Distinction",
    ],
    knowsAbout: ["Entrepreneurship", "Sales", "Sponsorship", "Leadership", "Public speaking", "Consulting", "Finance", "Strategy", "CRM software"],
    knowsLanguage: ["English", "Spanish"],
    ...(contact.linkedin ? { sameAs: [contact.linkedin] } : {}),
    subjectOf: press.map((a) => ({
      "@type": a.outlet.startsWith("GuelphToday") ? "NewsArticle" : "BlogPosting",
      headline: a.title,
      url: a.url,
      publisher: { "@type": "Organization", name: a.outlet.split(",")[0] },
    })),
  };
}

export function yardexNode() {
  return {
    "@type": "Organization",
    "@id": ids.yardex,
    name: "Yardex Guelph",
    url: yardex?.site?.url ?? orgLinks.yardex,
    founder: { "@id": ids.person },
    foundingDate: "2022-03",
    areaServed: "Guelph, Ontario",
    description: "Lawn care and property maintenance company in Guelph, Ontario, founded by Carter Florence.",
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: profile.fullName,
    description: site.description,
    inLanguage: "en-CA",
    publisher: { "@id": ids.person },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

/** A page node (WebPage, AboutPage, ProfilePage, CollectionPage…) tied to the Person. */
export function pageNode({ type = "WebPage", path, name, description }: { type?: string; path: string; name: string; description: string }) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": ids.website },
    inLanguage: "en-CA",
    ...(type === "ProfilePage" || type === "AboutPage" ? { mainEntity: { "@id": ids.person } } : { about: { "@id": ids.person } }),
  };
}

/** Renders JSON-LD safely (escapes `<` as the Next.js guide recommends). */
export function JsonLd({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}

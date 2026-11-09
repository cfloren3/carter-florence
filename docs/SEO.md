# SEO guide: carterflorence.com

## Pages and target searches

| Page | Primary searches | Supporting searches |
| --- | --- | --- |
| `/` | Carter Florence | Carter Florence Guelph, Carter Florence entrepreneur, Carter Florence Western University |
| `/about` | Carter Florence Guelph, about Carter Florence | Carter Florence Centennial CVI, Carter Florence Ivey, Centennial CVI alumni |
| `/entrepreneurship` | student entrepreneur Guelph, young entrepreneur Guelph | student founder Canada, youth entrepreneurship Ontario, Carter Florence TraitCRM |
| `/work/yardex-guelph` | Yardex Guelph founder, Carter Florence Yardex | Guelph lawn care entrepreneur, student business owner Guelph |
| `/leadership` | Carter Florence DECA, DECA Ontario provincial officer | Beyond Borders VP Sales, Western University consulting student, 180 Degrees Consulting Western |
| `/media` | Carter Florence photos / speaking | Carter Florence DECA speech, Evolve Gala |
| `/writing` | (noindex until the first real article) | entrepreneurship and student leadership topics |

Yardex's own local-service SEO ("lawn care Guelph") belongs on yardexguelph.ca, not here.
This site links to it, and only targets *Carter as the founder*.

## What's implemented

- Unique title, meta description, canonical URL, Open Graph and Twitter tags on every page (`src/lib/seo.tsx` → `pageMetadata`).
- JSON-LD on every page: `WebSite`, one shared `Person` (`/#person`), `Organization` (Yardex Guelph), the page node (`ProfilePage`, `AboutPage`, `WebPage`, `CollectionPage`) and `BreadcrumbList`. `/media` adds `ImageObject`s; future posts get `Article`.
- `sameAs`: LinkedIn. `subjectOf`: the GuelphToday article and Jim Carroll's blog post.
- `sitemap.xml` (all indexable pages) and `robots.txt`.
- One H1 per page, real H2 section headings, visible breadcrumbs, a footer link list and "Keep exploring" links between pages.
- Descriptive image filenames (e.g. `carter-florence-deca-provincials-speaking.jpg`) and alt text on every image; AVIF/WebP via `next/image` on Vercel.
- All text is server-rendered: with JavaScript off the full homepage content is readable.

## Adding an article

Add an entry to `src/data/writing.ts`. It is published at `/writing/<slug>` with `Article` structured data. The first post automatically makes `/writing` indexable and adds it to the sitemap.

## Google Search Console

1. Go to https://search.google.com/search-console → **Add property** → **Domain** → `carterflorence.com`.
2. Google shows a TXT record (`google-site-verification=…`). In **Wix → Domains → carterflorence.com → Manage DNS Records → TXT**, add it with host name left blank (`@`). Keep the existing A record.
3. Click **Verify** (DNS can take up to an hour).
4. **Sitemaps** → submit `https://carterflorence.com/sitemap.xml`.
5. **URL inspection** → inspect `https://carterflorence.com/` → **Request indexing**. Repeat for `/about`, `/entrepreneurship`, `/work/yardex-guelph`, `/leadership`, `/media`.

Alternative (URL-prefix property): set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel → Project → Settings → Environment Variables to the token from Google's "HTML tag" method and redeploy; the meta tag is added automatically.

## Reusable bio

The canonical biography lives in `src/data/bio.ts` and is shown on `/about`. Use the same wording on LinkedIn, club pages and event programs so search engines see one consistent identity.

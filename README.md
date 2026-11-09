# Carter Florence — Portfolio

> **SEO:** see [docs/SEO.md](docs/SEO.md) for the page/keyword map, structured data, Search Console steps and how to publish articles.

Personal portfolio and recruiting site for Carter Florence. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger + SplitText, Motion, Lenis and Lucide.

**v4 — WebGL layer.** Three.js / React Three Fiber scenes, all code-split and client-only (`src/components/webgl/`): a fixed ambient fluid gradient (`AmbientField`) behind the light sections, a cursor-reactive particle field in the opening (`HeroParticles`), particles that physically re-form between the figures in "By the numbers" (`NumberParticles`, desktop), and a liquid form in the contact section (`MorphBlob`). Each scene mounts only near the viewport (`InView`), pauses off-screen, is skipped without WebGL, and is off (ambient = one static frame) for reduced motion. Typography: Instrument Serif display, Inter Tight body, Geist Mono labels.

**v3 — one page, told as a conversation.** As visitors scroll, questions type themselves out and Carter’s answers stream in (`src/data/conversation.ts` + each project’s `qa`). An “Ask” bar at the bottom filters every question on the page and jumps to its answer. It is scripted, not an AI — every answer is written in the data files and should be reviewed by Carter.

**v2 — "digital biography".** See `DESIGN.md` for the design analysis and direction. The homepage reads as one continuous story: cinematic opening → introduction → by the numbers → four experience chapters → the story so far → in the frame (archive) → now (education) → thoughts (hidden until published) → let's connect.

The site is fully static (every page is pre-rendered at build time), so it's fast, cheap to host and easy for search engines and LinkedIn to read.

---

## 1. Local setup

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000 (shows drafts + placeholders)
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build on :3000
npm run lint       # ESLint
npx tsc --noEmit   # type check
```

## 2. Deployment

**Vercel (recommended):** push the repo to GitHub, import it at vercel.com/new, and accept the defaults. Then add your domain under *Settings → Domains*.

**Before the first deploy**, open `src/data/site.ts` and set `url` to the real domain (e.g. `https://carterflorence.com`). That one value drives canonical URLs, the sitemap, `robots.txt` and the social preview image URLs.

Any host that runs `next build && next start` works too (Netlify, Render, a VPS).

---

## 3. Where content lives

Every piece of text, every number and every image path is in `src/data/`. You should never need to touch a component to update the site.

| File | What it controls |
|---|---|
| `src/data/site.ts` | Domain, SEO title/description, keywords, `showPlaceholders` switch |
| `src/data/conversation.ts` | The scripted Q&A outside the project chapters (intro, numbers, story, photos, education, contact). Use `todo` for answers only Carter can write — shown as a marked placeholder in preview, hidden when `showPlaceholders` is false |
| `src/data/profile.ts` | Name, typewriter words, hero line, portrait + intro photo paths, **introduction copy**, availability, education, statement, interests |
| `src/data/metrics.ts` | "By the numbers": a 2×2 grid; digits condense out of a blur as you scroll (no WebGL) |
| `src/data/projects.ts` | The experience chapters, which scroll treatment each uses, and each chapter’s `qa` conversation |
| `src/data/experience.ts` | "The Story So Far" — year, title, short story and photo per chapter |
| `src/data/media.ts` | "In the Frame" archive |
| `src/data/socials.ts` | Email, LinkedIn, calendar link |
| `src/data/awards.ts` | Awards & recognition section |
| `src/data/navigation.ts` | Header / mobile menu links |

### Updating availability
In `profile.ts` → `availability`. Change `label` and `statement` for a new season, or set `open: false` once you've accepted an offer.

### Updating experiences
In `projects.ts`, copy an existing entry, give it a unique `slug`, and fill it in. It appears on the page automatically, and its questions show up in the Ask bar.

- `highlights[].scope` — use `"individual"` for things you did and `"organization"` for team-wide results (these get a "Team" tag).
- `period: null` shows a "to confirm" marker.
- `chapter` picks the homepage treatment: `"expand"` (image grows to full width), `"collage"` (sticky figure + parallax photos), `"sequence"` (wide photo frames with `sequenceCaptions`), `"analytical"` (spec sheet for scope-only work, via `focus`).
- `facts[].scope` — `"individual"` vs `"organization"`; organization-wide results are labelled on the site.
- `qa` is the chapter's conversation: `{ id, question, answer: ["…"] }`, or `{ id, question, todo: "prompt" }` for answers only Carter can give.

### Updating metrics
Edit `metrics.ts`. `value` is the number that counts up; `prefix` / `suffix` wrap it (`$`, `K+`, `+`). Only publish figures you can defend in an interview.

---

## 4. Photography & media

### Replacing the portrait
Save the original photograph (unedited) as:

```
public/images/portrait/carter-florence.jpg
```

A second, candid photo for the introduction goes at `public/images/portrait/carter-candid.jpg`, and one photo per biography chapter at the paths in `src/data/experience.ts` (`public/images/story/…`).

That's it — the placeholder disappears on the next build, and the portrait is also used in the LinkedIn/Open Graph preview image. If the face sits off-centre in narrow crops, adjust `profile.portrait.focus` (a CSS `object-position`, e.g. `"50% 20%"`).

### Project images
Each project lists its expected files (`cover`, `logo`, `gallery`) in `projects.ts`. Drop images into `public/images/projects/<project>/` with those names, or edit the paths. Missing files show a labelled placeholder with the exact path they expect.

### Gallery
Add an entry in `media.ts`:

```ts
{
  id: "deca-keynote",
  type: "image",                 // "image" | "video" | "link"
  category: "Public Speaking",
  title: "Opening keynote",
  caption: "Ontario DECA Provincials.",
  src: "/images/media/deca-keynote.jpg",
  alt: "Carter speaking at a podium in front of a large audience",
  size: "feature",               // "feature" | "tall" | "wide" | "standard"
  placeholderLabel: "Speaking photo",
}
```

- **Videos:** `type: "video"`, `video: "/videos/clip.mp4"`, and `src` as a poster image — or use `embedUrl` for YouTube/Vimeo (e.g. `https://www.youtube-nocookie.com/embed/VIDEO_ID`). Videos open in a modal with controls and never autoplay with sound.
- **Articles, podcasts, LinkedIn posts:** `type: "link"`, `href`, `linkLabel`.
- Recommended image size: ~2400px on the long edge, JPG/WebP. Next.js resizes and serves AVIF/WebP automatically.

Set `site.showPlaceholders = false` before launch to hide any gallery tiles, "to confirm" markers and unwritten case-study sections that still lack real content.

---

## 5. Writing

The site is a single page, so the article system was removed in v3. If you want writing later, it can return as a section or a separate route.

---

Your article in Markdown…
```

- `published: false` → hidden from the live site and sitemap; visible (labelled "Draft") in `npm run dev`.
- The homepage "Thoughts & Perspectives" section is **omitted entirely** in production until at least one article is published.
- Reading time is calculated automatically.

The four topic ideas from the brief are already there as unpublished drafts.

---

## 6. Résumé

To show "Watch the speech" buttons (DECA chapter and On stage), set `speech` in `src/data/profile.ts` to `{ url, label }`. Press links and the Yardex website live on the Yardex entry in `src/data/projects.ts`.

By request, the site does not attach or link a résumé. The header button and mobile menu point to the contact form instead. Copy rules: no em dashes in visible text.

## 7. Contact form

The contact section has a real form (`src/components/sections/ContactForm.tsx`). Where messages go, in order:

1. **Your live site:** set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a form service URL (e.g. a free Formspree form: `https://formspree.io/f/<id>`) in `.env.local` or your host's environment variables. Every submission is POSTed there as JSON and forwarded to your inbox.
2. **The hosted claude.ai preview:** messages are saved privately in the page's database (`messages/<sender>/sent`), readable only by you and editors. Note: people you share it with as *Viewers* can't write there, so they get option 3.
3. **Otherwise:** the visitor gets a pre-filled email to you, plus a "Copy message" button.

## 8. Contact links

Fill in `src/data/socials.ts` — `email`, `linkedin`, and optionally `calendar`. Missing values render as clearly marked placeholders rather than broken links.

---

## 9. SEO

- Title, description and keywords: `src/data/site.ts`
- Per-project titles/descriptions are generated from `projects.ts`
- `robots.txt` → `src/app/robots.ts`; sitemap → `src/app/sitemap.ts`
- Social preview image → `src/app/opengraph-image.tsx` (auto-uses the portrait once present)
- Structured data: `Person` (homepage), `BreadcrumbList` (case studies), `Article` (published posts)
- Add your LinkedIn URL in `socials.ts`; it's included in the `Person` schema as `sameAs`

After deploying, check previews with LinkedIn's Post Inspector (linkedin.com/post-inspector) and submit the sitemap in Google Search Console.

---

## 10. Design & motion notes

- **Palette** (`src/app/globals.css` → `@theme`): warm white `#F7F6F2`, stone `#E6E4DE`, charcoal `#202321`, sage `#9CA89B`, soft grey `#B8BAB7`, blush `#D6B5B4`. Secondary text uses `#5E625F` so small text meets WCAG AA.
- **Type:** Inter Tight (structure, name, headlines) + Instrument Serif italic (single emotive words, the typewriter), self-hosted via `next/font`.
- **Motion:** GSAP owns scroll-driven and text animation (pinned hero and Yardex chapter, scroll-formed blur numbers, philosophy interludes between chapters, DECA photo parallax; SplitText masks; scrubbed word highlighting); Motion handles the menu and viewer. They never animate the same element. All ScrollTriggers are created inside `useGSAP` so they are reverted on unmount; desktop-only pins use `gsap.matchMedia` and fall back to native-scroll layouts below 1024px.
- **Navigation colour:** sections marked `data-theme="dark"` automatically switch the header to light text.
- **WebGL:** see the v4 note at the top. Particle counts drop on small screens; the number morph is desktop-only (mobile shows the same figures as text).
- **Accessibility:** all content is in the server-rendered HTML; animations only hide content immediately before revealing it. `prefers-reduced-motion` disables smooth scrolling, parallax, the marquee, typing (crossfade instead) and reveal animations. The custom cursor only appears over project/gallery media on fine pointers and never replaces the system cursor.

## Project structure

```
src/
  app/                    routes, layout, SEO (sitemap, robots, OG image)
  components/
    animations/           SplitReveal, Reveal, ImageReveal, Parallax, CountUp, Magnetic, Marquee…
    chapters/             Expand / Collage / Sequence / Analytical chapter treatments
    hero/                 CinematicHero, TypewriterText
    layout/               Navbar, Footer, SmoothScroll, Cursor, ScrollProgress, PageTransition
    media/                MediaFrame, MediaGallery, Lightbox
    chat/                 ChatExchange (scroll-played Q&A), ChatThread, AskBar
    sections/             Introduction, Numbers, Chapters, Story, Archive, Education, Contact
    ui/                   TextLink, Arrow, Eyebrow, placeholders
  data/                   ← all editable content
  lib/                    asset/article helpers, GSAP setup
public/
  images/{portrait,projects,media,logos}/
  videos/
```

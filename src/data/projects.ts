/**
 * EXPERIENCE CHAPTERS
 * ------------------------------------------------------------------
 * Each entry renders as a chapter on the (single) page.
 * Source of facts: Carter’s résumés (Sept–Oct 2026), his Ontario DECA Letter of Intent (2025)
 * and traitcrm.com.
 *
 * `chapter` picks the scroll treatment:
 *   "expand"     – wide image grows from a frame to full width (pinned)
 *   "collage"    – sticky headline figure beside a parallax photo collage
 *   "sequence"   – one wide photo with a caption, then an impact strip
 *   "product"    – software showcase with real product screens (TraitCRM)
 *   "compact"    – several roles in one tight grid (e.g. everything at Western)
 *
 * `qa` is the chapter's conversation (see data/conversation.ts).
 * `facts[].scope` — individual · led (a team Carter led) · team · organization.
 */

import type { Exchange } from "./conversation";
import type { Metric } from "./metrics";
import type { MediaAsset, Theme } from "./types";

export interface Fact {
  value: string;
  label: string;
  scope: Metric["scope"];
}

export interface Project {
  slug: string;
  tag: string;
  name: string;
  role: string;
  period: string | null;
  location?: string;
  categories: string[];
  chapter: "expand" | "collage" | "sequence" | "product" | "compact";
  theme: Theme;
  summary: string;
  facts: Fact[];
  highlights?: string[];
  /** The venture's own website. */
  site?: { url: string; label: string };
  /** Articles about it (backlinks). */
  press?: { outlet: string; title: string; url: string; date: string }[];
  /** Plain-language context for readers who don't know the organization. */
  explainer?: { title: string; text: string };
  /** Software built for the venture, teased on the chapter (links to its own chapter). */
  built?: { name: string; line: string; href: string; label: string };
  /** Awards / recognition, shown as a strip on the chapter. */
  awards?: { title: string; detail: string; year?: string }[];
  /** "product" chapters: features and real product screens. */
  product?: {
    url: string;
    label: string;
    pitch: string;
    features: { title: string; text: string }[];
    screens: (MediaAsset & { caption: string; kind: "desktop" | "phone"; width: number; height: number })[];
  };
  focus?: { client?: string; items: string[] };
  sequenceCaptions?: string[];
  /** For "compact" chapters: one tile per role. */
  roles?: { org: string; role: string; dates: string; line: string; stat?: string; statLabel?: string }[];
  cover: MediaAsset;
  gallery: MediaAsset[];
  qa: Exchange[];
}

export const projects: Project[] = [
  {
    slug: "yardex-guelph",
    tag: "Yardex",
    name: "Yardex Guelph",
    role: "Founder",
    period: "March 2022 – Present",
    location: "Guelph, Ontario",
    categories: ["Entrepreneurship", "Operations", "Leadership"],
    chapter: "expand",
    theme: "sage",
    summary: "The lawn care company I started at 13, and still run today.",
    site: { url: "https://www.yardexguelph.ca", label: "yardexguelph.ca" },
    press: [
      {
        outlet: "GuelphToday",
        title: "Fourteen-year-old launches local landscaping company",
        url: "https://www.guelphtoday.com/local-news/fourteen-year-old-launches-local-landscaping-company-6451456",
        date: "2023",
      },
      {
        outlet: "Futurist Jim Carroll, Leadership blog",
        title: "Leadership lessons are all around you: 10 leadership lessons from a 14-year-old CEO",
        url: "https://jimcarroll.com/2023/04/daily-inspiration-leadership-lessons-are-all-around-you-you-just-need-to-know-where-to-look/",
        date: "April 2023",
      },
    ],
    facts: [],
    highlights: ["#2 on Google for lawn care in Guelph, through my own SEO", "Fully insured and WSIB-covered", "Four-person crew", "Runs on TraitCRM, software I built"],
    built: {
      name: "TraitCRM",
      line: "Yardex runs on a CRM I designed and built myself. See it in the next chapter.",
      href: "#work-traitcrm",
      label: "See TraitCRM",
    },
    awards: [
      { title: "Quality Business Award", detail: "Guelph", year: "2024" },
      { title: "Top-three lawn care company in Guelph", detail: "ThreeBest Rated", year: "2026" },
      { title: "#2 on Google", detail: "Through my own SEO, with 50+ five-star reviews" },
      { title: "In the press", detail: "GuelphToday and futurist Jim Carroll" },
    ],
    cover: {
      src: "/images/projects/yardex/yardex-guelph-striped-lawn.jpg",
      alt: "A freshly striped, edged front lawn maintained by Yardex in Guelph",
      placeholderLabel: "Yardex, wide business photo",
    },
    gallery: [
      { src: "/images/projects/yardex/carter-florence-yardex-guelph-edging.jpg", alt: "Carter Florence edging a lawn in a Yardex shirt", placeholderLabel: "Edging", focus: "50% 45%" },
      { src: "/images/projects/yardex/yardex-guelph-lawn-oak-tree.jpg", alt: "A finished Yardex front lawn under a large oak tree", placeholderLabel: "Finished lawn", focus: "50% 60%" },
    ],
    qa: [
      {
        id: "yardex-what",
        question: "What is Yardex?",
        answer: [
          "A lawn care and property maintenance company I started in Guelph at 13. Today it runs on recurring contracts across 50 properties with a four-person crew. I handle the hiring, pricing, scheduling, finances and insurance, and I still get out on the lawns myself.",
        ],
      },
      {
        id: "yardex-why",
        question: "Why did you start it?",
        answer: [
          "I wanted to earn my own money, and I didn’t want to wait until I was older to start something. Lawn care was a business I could start in my own neighbourhood with almost nothing.",
          "Once I had a few customers, I got hooked on making it better: better pricing, better service, better systems. That hasn’t stopped.",
        ],
      },
      {
        id: "yardex-grow",
        question: "How did you grow it?",
        answer: [
          "Mostly Google and word of mouth. I taught myself SEO and put a lot of hours into our website and Google profile until Yardex ranked #2 on Google in Guelph, with 50+ five-star reviews.",
          "The rest is small things done consistently. Every holiday season, each of our weekly clients gets a custom Yeti mug. It’s a small cost, and it’s a big part of why people stay.",
        ],
      },
    ],
  },
  {
    slug: "traitcrm",
    tag: "TraitCRM",
    name: "TraitCRM",
    role: "Founder & Developer",
    period: null,
    location: "Built with Claude Code",
    categories: ["Software", "Product", "Operations"],
    chapter: "product",
    theme: "sage",
    summary: "The CRM I built for trade and service businesses, starting with my own.",
    facts: [],
    product: {
      url: "https://traitcrm.com",
      label: "traitcrm.com",
      pitch:
        "Every business gets its own private, branded portal. The owner runs it from a laptop. The crew signs in on their phones with a personal 6-digit code. No app to download, no passwords, no setup.",
      features: [
        { title: "Dashboard", text: "Revenue, net profit, top clients and expenses, the moment you open it." },
        { title: "Scheduling", text: "Build the week in seconds. It syncs live to Apple, Google or Outlook Calendar." },
        { title: "Job timer", text: "Crew taps Start on arrival. A live dollars-per-minute score, then Stop saves the job automatically." },
        { title: "Clients & billing", text: "Per-service, monthly or prepaid. Prepaid balances count down on their own." },
        { title: "Expenses & profit", text: "Fuel, equipment, supplies and insurance, with your real profit after every cost." },
        { title: "Crew codes", text: "Add a crew member by email and they get a code. Signed in within seconds." },
      ],
      screens: [
        { kind: "desktop", src: "/images/projects/traitcrm/traitcrm-dashboard.jpg", width: 1064, height: 892, alt: "The TraitCRM dashboard showing revenue, jobs today, net profit, a monthly revenue chart, top clients and expenses", placeholderLabel: "Dashboard", caption: "The dashboard" },
        { kind: "phone", src: "/images/projects/traitcrm/traitcrm-job-timer.jpg", width: 1064, height: 1096, alt: "The TraitCRM job timer on a phone, showing a live timer and dollars-per-minute score", placeholderLabel: "Job timer", caption: "The crew’s job timer" },
        { kind: "desktop", src: "/images/projects/traitcrm/traitcrm-clients-billing.jpg", width: 1068, height: 660, alt: "The TraitCRM client list with billing types and prices", placeholderLabel: "Clients", caption: "Clients and billing" },
        { kind: "desktop", src: "/images/projects/traitcrm/traitcrm-expenses-profit.jpg", width: 1068, height: 792, alt: "The TraitCRM expenses screen with this month’s costs and net profit", placeholderLabel: "Expenses", caption: "Expenses and real profit" },
        { kind: "desktop", src: "/images/projects/traitcrm/traitcrm-crew-sign-in-codes.jpg", width: 1072, height: 648, alt: "TraitCRM crew settings with 6-digit sign-in codes and the crew sign-in keypad", placeholderLabel: "Crew codes", caption: "Crew sign-in codes" },
      ],
    },
    cover: { src: "/images/projects/traitcrm/traitcrm-dashboard.jpg", alt: "The TraitCRM dashboard", placeholderLabel: "TraitCRM" },
    gallery: [],
    qa: [
      {
        id: "trait-what",
        question: "What is TraitCRM?",
        answer: [
          "A CRM I designed and built for trade and service businesses, starting with my own. Yardex runs on it every day: scheduling, clients, billing, routing, job timing, expenses and our standard operating procedures, all in one place.",
          "I built it myself with Claude Code, Anthropic’s AI coding tool. I’m not a trained developer, so that’s what made it possible: I could describe exactly what my crew needed, test it on real jobs the next day, and keep improving it.",
        ],
      },
      {
        id: "trait-why",
        question: "Why build it instead of buying one?",
        answer: [
          "Because nothing fit a small crew. The big CRMs are built for sales teams at desks, and I was doing scheduling and billing in spreadsheets late at night. So I built what we actually needed, and made it work on a phone in the sun.",
        ],
      },
      {
        id: "trait-learned",
        question: "What did building it teach you?",
        answer: [
          "That the best product decisions come from doing the work yourself. Every feature started as a real problem on a real job. If my crew wouldn’t use it, it didn’t ship.",
        ],
      },
    ],
  },
  {
    slug: "beyond-borders",
    tag: "Beyond Borders",
    name: "Beyond Borders",
    role: "Vice President of Sales, Evolve Gala",
    period: "November 2025 – January 2026",
    location: "Guelph, Ontario",
    categories: ["Sales", "Partnerships", "Leadership"],
    chapter: "collage",
    theme: "rose",
    summary: "I led a 21-person sales team to $185,000 in corporate sponsorships in five weeks.",
    facts: [
      { value: "$185,000", label: "Corporate sponsorships, in 5 weeks", scope: "led" },
      { value: "$37,000", label: "Secured personally, #1 of 21 sellers", scope: "individual" },
      { value: "48%", label: "Year-over-year growth", scope: "led" },
      { value: "$255,000", label: "Event net profit", scope: "organization" },
      { value: "900+", label: "Audience I spoke to at the gala", scope: "individual" },
    ],
    cover: {
      src: "/images/projects/beyond-borders/beyond-borders-evolve-gala-stage.jpg",
      alt: "The Beyond Borders Evolve Gala cast on stage in a theatre, under the Evolve logo",
      placeholderLabel: "Evolve Gala, stage",
    },
    gallery: [
      {
        src: "/images/projects/beyond-borders/carter-florence-evolve-gala-speaking.jpg",
        alt: "Carter Florence at the Beyond Borders lectern during the Evolve Gala, seen from the balcony",
        placeholderLabel: "Evolve Gala, lectern",
        focus: "45% 52%",
      },
      {
        src: "/images/projects/beyond-borders/beyond-borders-guelph-wish-fund-cheque.jpg",
        alt: "Carter Florence and two teammates holding a $63,750 Beyond Borders cheque to the Guelph Wish Fund for Children",
        placeholderLabel: "Cheque presentation",
        caption: "$63,750 from Beyond Borders to the Guelph Wish Fund for Children.",
      },
    ],
    qa: [
      {
        id: "bb-what",
        question: "What did you do at Beyond Borders?",
        answer: [
          "I ran sales for the Evolve Gala. I built a four-tier sponsorship strategy, led 3 managers and 18 reps, and worked with our CFO on targets and forecasts. In five weeks the team raised $185,000, up 48% on the year before.",
        ],
      },
      {
        id: "bb-sell",
        question: "How do you sell?",
        answer: [
          "From the front. I finished #1 of 21 sellers with $37,000, because I don’t think you can ask a team to make calls you aren’t making yourself.",
          "Most of selling is preparation and follow-up: know what the business cares about, show them exactly what they get, and follow up until you have an answer.",
        ],
      },
      {
        id: "bb-night",
        question: "What was the night like?",
        answer: [
          "I spoke to 900+ people alongside former Guelph mayor Cam Guthrie. The gala netted $255,000, and $63,750 went to the Guelph Wish Fund for Children. After five weeks of calls, that was a good night.",
        ],
      },
    ],
  },
  {
    slug: "deca",
    tag: "DECA",
    name: "DECA",
    role: "Provincial Executive Officer, Chapter Engagement",
    period: "May 2025 – June 2026",
    location: "Ontario",
    categories: ["Leadership", "Public Speaking", "Operations"],
    chapter: "sequence",
    theme: "forest",
    summary: "One of 10 students leading Ontario DECA. I ran chapter engagement.",
    explainer: {
      title: "What is DECA?",
      text: "DECA is an international organization that prepares high school students for careers in business through case competitions, conferences and leadership programs. Ontario DECA has 17,481 members. Each year, 10 students are selected as Provincial Executive Officers to help lead it: they support chapters across the province, represent members, and run the stage at the Provincial Championships in Toronto.",
    },
    facts: [
      { value: "81.1%", label: "Of returning members said the Resource Hub I built improved their access to resources", scope: "individual" },
      { value: "18K", label: "Members reached by the communications I launched (nearly 18,000)", scope: "individual" },
      { value: "2,600+", label: "Attendees I presented to at the Provincial Championships", scope: "individual" },
      { value: "17,481", label: "Members represented by our team of 10 officers", scope: "organization" },
    ],
    sequenceCaptions: ["Presenting to 2,600+ attendees at the Provincial Championships."],
    cover: {
      src: "/images/projects/deca/carter-florence-deca-provincials-speaking.jpg",
      alt: "Carter Florence speaking at the lectern at the Ontario DECA Provincial Championships, with the officer team on screen",
      focus: "50% 45%",
      placeholderLabel: "Provincials, lectern",
    },
    gallery: [],
    qa: [
      {
        id: "deca-officer",
        question: "What is a Provincial Executive Officer?",
        answer: [
          "One of the 10 students chosen each year to help lead Ontario DECA, alongside its staff and board. Each officer owns a portfolio. Mine was chapter engagement: the chapters at high schools across Ontario that DECA members belong to.",
        ],
      },
      {
        id: "deca-what",
        question: "What did you actually do as a provincial officer?",
        answer: [
          "I led chapter engagement for the province. I built Ontario DECA’s first central Resource Hub, so every chapter had the same cases, guides and training tools as the strongest ones, and I ran the communications that kept members across Ontario informed.",
          "I joined as a grade 9 member who thought every case had one right answer. I left as one of the 10 students leading it.",
        ],
      },
    ],
  },
  {
    slug: "western",
    tag: "Western",
    name: "At Western",
    role: "Consulting, clubs & leadership",
    period: "September 2026 – Present",
    location: "London, Ontario",
    categories: ["Consulting", "Sponsorship", "Finance"],
    chapter: "compact",
    theme: "stone",
    summary: "Four roles in my first term at Western.",
    facts: [],
    roles: [
      { org: "180 Degrees Consulting", role: "Consultant", dates: "Sept 2026 – Present", line: "Nonprofit consulting on donor technology." },
      { org: "Pre-Business Students’ Network", role: "Director of Development", dates: "Sept 2026 – Present", line: "Case competitions, including the Deloitte-sponsored Catalyze." },
      { org: "Western Sales & Marketing Club", role: "Director of Sponsorships", dates: "Sept 2026 – Present", line: "Corporate sponsors and the partnership pipeline." },
      { org: "Western ACE", role: "Director of Finance", dates: "Sept 2026 – Present", line: "Budgeting and forecasting for a 100+ member club." },
    ],
    cover: { src: "/images/projects/western/cover.jpg", alt: "Western University", placeholderLabel: "Western" },
    gallery: [],
    qa: [
      {
        id: "western-what",
        question: "What are you doing at Western?",
        answer: [
          "Four roles: consultant at 180 Degrees Consulting, Director of Development at the Pre-Business Students’ Network, Director of Sponsorships at the Sales & Marketing Club, and Director of Finance at Western ACE.",
          "I joined clubs where I could do real work in my first term: advising a real nonprofit, writing cases, and bringing in sponsors.",
        ],
      },
    ],
  },
];

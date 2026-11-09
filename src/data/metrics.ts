/**
 * "BY THE NUMBERS": a 2×2 grid of figures that condense out of a blur as you scroll (CSS, no WebGL).
 * ------------------------------------------------------------------
 * Source: Carter_Florence_Resume_Final.pdf (October 2026).
 * `scope` is printed on the site — be exact about whose result it is:
 *   individual   – Carter's own result
 *   led          – a team result Carter led
 *   team         – a result shared with teammates (e.g. a team event)
 *   organization – the wider organization's result
 * Each figure gets its own particle canvas, mounted only while near the screen.
 */

export interface Metric {
  id: string;
  display: string;
  value: number;
  label: string;
  context: string;
  scope: "individual" | "led" | "team" | "organization";
  project?: string;
}

export const metrics: Metric[] = [
  {
    id: "revenue",
    display: "$50,000+",
    value: 50000,
    label: "Business revenue",
    context: "Annual revenue at Yardex Guelph, the company I started at 13. $36,000 of it is recurring.",
    scope: "individual",
    project: "yardex-guelph",
  },
  {
    id: "sponsorship",
    display: "$185,000",
    value: 185000,
    label: "Corporate sponsorships",
    context: "Raised in five weeks by the 21-person sales team I led as VP of Sales, up 48% on the year before.",
    scope: "led",
    project: "beyond-borders",
  },
  {
    id: "members",
    display: "17,481",
    value: 17481,
    label: "Members represented",
    context: "Ontario DECA members, represented by 10 Provincial Executive Officers. I was one of them.",
    scope: "organization",
    project: "deca",
  },
  {
    id: "icdc",
    display: "7th",
    value: 7,
    label: "Worldwide",
    context: "In Entrepreneurship Team Decision Making at the 2026 DECA International Career Development Conference.",
    scope: "team",
    project: "deca",
  },
];

export const SCOPE_LABEL: Record<Metric["scope"], string> = {
  individual: "Personal result",
  led: "Team I led",
  team: "Team result",
  organization: "Organization-wide",
};

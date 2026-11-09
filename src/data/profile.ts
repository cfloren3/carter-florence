/**
 * PROFILE
 * ------------------------------------------------------------------
 * Identity, introduction copy, education and interests.
 * Most routine updates only touch this file.
 */

export interface Portrait {
  /**
   * The original professional photograph. Drop it at this path and it is used
   * automatically (hero, introduction, social share image). Never retouched.
   */
  src: string;
  alt: string;
  /** CSS object-position — keeps the face in frame on every crop. */
  focus: string;
  /** width ÷ height of the photo — sizes the hero portrait without cropping. */
  aspect: number;
}

export const profile = {
  firstName: "Carter",
  lastName: "Florence",
  fullName: "Carter Florence",
  location: "Ontario, Canada",

  /** Typewriter descriptors in the hero, in order. */
  roles: ["Entrepreneur.", "Student.", "Builder.", "Strategist."],

  /** Short line under the name in the hero. */
  heroLine: "Western University · International Relations · Ivey AEO",

  portrait: {
    src: "/images/portrait/carter-florence.jpg",
    alt: "Carter Florence in a grey suit, white shirt and light pink tie",
    focus: "50% 24%",
    aspect: 1047 / 1605,
  } satisfies Portrait,

  /** Big headline above the first conversation. */
  introHeadline: "I’ve always liked building things.",

  /** Availability is intentionally low-key: a personal brand, not an application. */
  availability: {
    open: true,
    label: "Open to Summer 2027 opportunities",
  },

  education: {
    institution: "Western University",
    program: "International Relations",
    business: "Ivey Business School, AEO",
    businessNote: "Advanced Entry Opportunity",
    graduation: "Expected 2030",
    award: "Western University Scholarship of Distinction",
  },

  statement: "Currently learning, building, and exploring what comes next.",

  /** Link to a recording of Carter's speech. `null` hides the "Watch the speech" buttons. */
  speech: { url: "https://www.youtube.com/watch?v=AbsgOJbReaA", label: "Watch my speech" } as null | { url: string; label: string },

  /**
   * "What I believe": shown full-screen between the experience chapters.
   * `after` is the chapter slug it follows; `note` ties it to something real.
   */
  philosophies: [
    {
      after: "yardex-guelph",
      quote: "People don’t care how much you know until you show them how much you care.",
      note: "It’s why every weekly Yardex client gets a custom Yeti mug each holiday season.",
    },
    {
      after: "traitcrm",
      quote: "You don’t become the best version of anything by starting over. You build on the last one.",
      note: "Every version of Yardex, and of TraitCRM, started from the one before it.",
    },
    {
      after: "beyond-borders",
      quote: "Rejection is redirection. All it changes is how you take your next shot.",
      note: "Sponsorship sales means hearing no far more than yes. Every no made the next call better.",
    },
    {
      after: "deca",
      quote: "Hard work beats talent every time.",
      note: "From a grade 9 member who thought every case had one right answer, to 7th in the world.",
    },
  ],

  /** "What I do": the pitch on the Learn more screen. Every proof point is real. */
  whatIDo: [
    { verb: "I sell.", line: "I can get a yes.", proof: "#1 of 21 sellers at the Evolve Gala, with $37,000 in sponsorships. Every Yardex contract started with a conversation." },
    { verb: "I build.", line: "From nothing, then better.", proof: "A company at 13, and TraitCRM, the software it runs on." },
    { verb: "I lead.", line: "People who want to show up.", proof: "A four-person crew, a 21-person sales team, and chapter engagement for Ontario DECA." },
    { verb: "I speak.", line: "Comfortable on a big stage.", proof: "2,600+ at DECA Provincials. 900+ at the Evolve Gala." },
  ],

  interests: ["Finance", "Strategy", "Consulting", "Investments", "Entrepreneurship", "Technology"],
} as const;

export type Profile = typeof profile;

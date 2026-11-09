/**
 * CONVERSATION — the scripted Q&A that runs through the page.
 * ------------------------------------------------------------------
 * As a visitor scrolls, each question types itself out and the answer
 * streams in word by word. The "Ask" bar at the bottom of the screen lists
 * every question and jumps to its answer.
 *
 * This is NOT an AI chatbot — every answer is written here, in Carter’s own
 * voice, and should be reviewed by Carter before launch.
 *
 * `answer`: one string per paragraph.
 * `todo`:   use instead of `answer` when only Carter can answer. It renders
 *           as a clearly marked placeholder while site.showPlaceholders is
 *           true, and the whole exchange is hidden when it's false.
 */

export interface Exchange {
  /** Unique id — used for the Ask bar's jump links. */
  id: string;
  question: string;
  answer?: string[];
  todo?: string;
}

/** Exchanges that sit outside the project chapters. */
export const conversation = {
  intro: [
    {
      id: "who",
      question: "So, who are you?",
      answer: [
        "I’m Carter. I started a lawn care company at 13, and I’ve been building, selling and leading things ever since. Now I study International Relations at Western, with Advanced Entry into Ivey. Here’s what I’ve done so far.",
      ],
    },
  ],
  story: [],
  archive: [],
  education: [
    {
      id: "studying",
      question: "What are you studying, and why?",
      answer: [
        "International Relations at Western, with Advanced Entry into the Ivey Business School and a Scholarship of Distinction. I graduate in 2030.",
        "I picked IR because business doesn’t stop at borders. A summer studying international business in New York, Germany, Switzerland and Italy made that obvious. I want to understand how markets, policy and people connect, then bring that into finance, strategy and consulting.",
      ],
    },
  ],
  contact: [
    {
      id: "why-talk",
      question: "Why should I talk to you?",
      answer: [
        "Because I’ve done the work, not just studied it. I’ve hired and managed a crew, priced jobs, chased invoices, built the software my business runs on, and personally sold $37,000 in sponsorships in five weeks.",
        "I learn fast, I take ownership, and when I commit to something, it gets done.",
      ],
    },
    {
      id: "work-with",
      question: "What are you like to work with?",
      answer: [
        "Coachable and direct. DECA taught me that the best solution is almost never the first one, so I listen, I ask for feedback, and I change course quickly when something isn’t working. I’d rather hear the hard truth early than find out late.",
      ],
    },
    {
      id: "looking-for",
      question: "What are you looking for?",
      answer: [
        "Summer 2027 internships in finance, strategy, consulting or sales, and conversations with people who build things. If you’re working on something interesting, I’d like to hear about it.",
      ],
    },
    {
      id: "contact",
      question: "How can I reach you?",
      answer: ["Send me a note below. Coffee chats, internship or workplace inquiries and speaking invitations are all welcome, and I read every message."],
    },
  ],
} satisfies Record<string, Exchange[]>;

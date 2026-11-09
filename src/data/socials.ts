/**
 * CONTACT & SOCIAL LINKS
 * ------------------------------------------------------------------
 * ⚠️  Fill these in before launch. `null` renders a clearly marked
 *     placeholder instead of a broken link.
 */

export interface Contact {
  /** e.g. "carter@domain.com" */
  email: string | null;
  /** Full URL, e.g. "https://www.linkedin.com/in/your-handle" */
  linkedin: string | null;
  /** Optional booking link (Calendly, Cal.com…). Hidden when null. */
  calendar: string | null;
}

export const contact: Contact = {
  email: "carter@yardexguelph.ca", // from the résumé
  linkedin: "https://www.linkedin.com/in/carter-florence",
  calendar: null, // Optional
};

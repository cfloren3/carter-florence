/**
 * NAVIGATION: header and mobile menu.
 * Single-page site: plain "#id" anchors (work on any host, including the hosted preview).
 */

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

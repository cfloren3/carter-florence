/**
 * NAVIGATION: header and mobile menu.
 * Real pages for About / Entrepreneurship / Leadership / Media; "/#id" for home sections.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Entrepreneurship", href: "/entrepreneurship" },
  { label: "Leadership", href: "/leadership" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/#contact" },
];

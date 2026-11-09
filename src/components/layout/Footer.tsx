"use client";

import { scrollToTarget } from "@/lib/animations/lenis-store";
import { useYear } from "@/lib/hooks";
import Link from "next/link";
import { contact } from "@/data/socials";

/** Minimal footer that continues the charcoal contact section. */
export function Footer() {
  const year = useYear(2026);
  return (
    <footer data-theme="dark" className="bg-ink text-grey">
      <nav aria-label="Footer" className="shell grid gap-8 border-t border-paper/10 py-10 text-[0.9375rem] sm:grid-cols-3">
        <div>
          <p className="eyebrow text-grey">Carter Florence</p>
          <p className="mt-3 max-w-xs leading-snug text-paper/70">Student entrepreneur from Guelph, Ontario. Western University, Ivey AEO.</p>
        </div>
        <ul className="flex flex-col gap-2">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Entrepreneurship", "/entrepreneurship"],
            ["Yardex Guelph", "/work/yardex-guelph"],
            ["Leadership", "/leadership"],
            ["Media", "/media"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="link-line text-paper/85">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          {[
            ["LinkedIn", contact.linkedin],
            ["yardexguelph.ca", "https://www.yardexguelph.ca"],
            ["traitcrm.com", "https://traitcrm.com"],
          ]
            .filter(([, href]) => href)
            .map(([label, href]) => (
              <li key={href}>
                <a href={href!} target="_blank" rel="noopener" className="link-line text-paper/85">
                  {label} ↗
                </a>
              </li>
            ))}
        </ul>
      </nav>
      <div className="shell flex flex-col gap-4 border-t border-paper/10 py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
        <p>
          Carter Florence © <span suppressHydrationWarning>{year}</span>
        </p>
        <p className="t-serif text-base text-paper/80">Built with curiosity.</p>
        <button
          type="button"
          onClick={() => {
            scrollToTarget(0, 0);
            document.getElementById("top")?.focus({ preventScroll: true });
          }}
          className="group flex min-h-11 items-center gap-3 self-start text-paper sm:self-auto"
        >
          <span className="link-line">Back to top</span>
          <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 transition-transform duration-500 group-hover:-translate-y-1">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
